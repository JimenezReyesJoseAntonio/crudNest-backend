import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ServicioEntity } from './servicio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicioRepository } from './servicio.repository';
import { ServicioDto } from './dto/servicio.dto';
import { Between, EntityManager } from 'typeorm';
import * as moment from 'moment';
import { Logger } from '@nestjs/common';


@Injectable()
export class ServicioService {
  constructor(
    @InjectRepository(ServicioEntity)
    private serviceRepository: ServicioRepository,
  ) {}

  async getAll(): Promise<ServicioEntity[]> {
    const list = await this.serviceRepository.find({
      relations: ['cliente', 'vehiculo', 'operador', 'grua', 'usuario'],
    });
    if (!list.length) {
      throw new NotFoundException({
        message: 'La lista de servicios esta vacia en estos momentos',
      });
    }
    return list;
  }

  async findById(id: number): Promise<ServicioEntity | null> {
    const servcio = await this.serviceRepository.findOne({
      where: { id: id },
      relations: ['cliente', 'vehiculo', 'operador', 'grua', 'usuario'], // Cargar las relaciones necesarias
    });
    if (!servcio) {
      throw new NotFoundException({ message: 'no existe el servicio' });
    }
    return servcio;
  }

   //mandaba un numero ahora manda un any
   async create(dto: ServicioDto, manager: EntityManager): Promise<any> {
   // Verificar y loguear la fecha recibida
   console.log('Tipo de fecha recibida:', typeof dto.fecha);
   const fechaRecibida = dto.fecha;
   console.log('Fecha recibida en UTC:', fechaRecibida);
   console.log('Fecha interpretada en hora local:', fechaRecibida);
   console.log('veri date'+new Date().getTimezoneOffset()); // Debería ser el mismo en ambos lugares
   // Crear la entidad Servicio
   dto.fecha = moment(dto.fecha).utc().toDate();
   console.log('fecha guardada en la bd'+dto.fecha);
    const servicio = this.serviceRepository.create(dto);
    const servicioGuardado = await manager.save(servicio);
    return servicioGuardado;
 }

  
  async update(id: number, dto: ServicioDto): Promise<any> {
    try {
      const servicio = await this.findById(id);
      if (!servicio) {
        throw new NotFoundException({ message: 'No se encontró el servicio' });
      }

    
      servicio.ubicacionSalida = dto.ubicacionSalida ?? servicio.ubicacionSalida;
      servicio.ubicacionContacto = dto.ubicacionContacto?? servicio.ubicacionContacto;
      servicio.ubicacionTermino = dto.ubicacionTermino?? servicio.ubicacionTermino;
      servicio.montoCobrado = dto.montoCobrado ?? servicio.montoCobrado;
      servicio.observaciones = dto.observaciones ?? servicio.observaciones;
      servicio.operador = dto.operador ?? servicio.operador;
      servicio.grua = dto.grua ?? servicio.grua;




      await this.serviceRepository.save(servicio);

      return { message: 'Datos del servicio actualizados' };
    } catch (error) {
      // Manejar errores específicos
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException({ message: error.message });
      } else {
        throw error; // Relanzar otros errores
      }
    }
  }
//actualiza el estado del servicio
  async updateEstado(id: number, fieldName: string, newValue: any): Promise<any> {
    try {
        const servicio = await this.findById(id);
        if (!servicio) {
            throw new NotFoundException({ message: 'No se encontró el servicio' });
        }

        // Verificar que el campo a actualizar existe en el modelo de Servicio
        if (!(fieldName in servicio)) {
            throw new BadRequestException({ message: 'Campo a actualizar no válido' });
        }

        servicio[fieldName] = newValue;

        await this.serviceRepository.save(servicio);

        return { message: 'Dato del servicio actualizado' };
    } catch (error) {
        // Manejar errores específicos
        if (error.code === 'ER_DUP_ENTRY') {
            throw new ConflictException({ message: error.message });
        } else {
            throw error; // Relanzar otros errores
        }
    }
}



  async delete(id: number): Promise<any> {
    const servcio = await this.findById(id);
    if (!servcio) {
        throw new NotFoundException({ message: 'No se encontró el servicio' });
    }

    servcio.eliminado = 1; // Marcar como eliminada
    await this.serviceRepository.save(servcio);

    return { message: 'Servicio eliminado' };
}                                       

async getByDateRange(startDate: Date, endDate: Date): Promise<ServicioEntity[]> {
  const adjustedStartDate = moment(startDate).startOf('day').utc().toDate();
  const adjustedEndDate = moment(endDate).endOf('day').utc().toDate();
  console.log(`Fetching services from ${adjustedStartDate} to ${adjustedEndDate}`);
  return await this.serviceRepository.find({
    where: {
      fecha: Between(adjustedStartDate, adjustedEndDate),
    },
    relations: ['cliente', 'vehiculo', 'operador', 'grua', 'usuario'],
  });
}



async getServiciosPorClienteTipo(): Promise<any> {
  return this.serviceRepository
      .createQueryBuilder('servicio')
      .innerJoin('servicio.cliente', 'cliente')
      .innerJoin('cliente.clienteTipo', 'clienteTipo')
      .select('clienteTipo.id', 'clienteTipoId')
      .addSelect('clienteTipo.nombreCliente', 'clienteTipoNombre')
      .addSelect('COUNT(servicio.id)', 'cantidad')
      .groupBy('clienteTipo.id')
      .getRawMany();
}

async getCantidadTotalServicios(): Promise<number> {
  const result = await this.serviceRepository
    .createQueryBuilder('servicio')
    .select('COUNT(*)', 'totalServicios')
    .getRawOne();

  return parseInt(result.totalServicios); // Convertir la cadena a número
}

}
