import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CotizacionesEntity } from './cotizaciones.entity';
import { CotizacionesRepository } from './cotizaciones.repository';
import { CotizacionDto } from './dto/cotizaciones.dto';
import * as moment from 'moment';

@Injectable()
export class CotizacionesService {
  constructor(
    @InjectRepository(CotizacionesEntity)
    private cotizacionesRepository: CotizacionesRepository,
  ) {}

  async getAll(): Promise<CotizacionesEntity[]> {
    const list = await this.cotizacionesRepository.find({
      relations: [ 'usuario'],
    });
    if (!list.length) {
      throw new NotFoundException({
        message: 'La lista de cotizaciones esta vacia en estos momentos',
      });
    }
    return list;
  }

  async findById(id: number): Promise<CotizacionesEntity | null> {
    const cotizacion = await this.cotizacionesRepository.findOne({
      where: { id: id },
      relations: [ 'usuario'], // Cargar las relaciones necesarias
    });
    if (!cotizacion) {
      throw new NotFoundException({ message: 'no existe la cotizacion' });
    }
    return cotizacion;
  }

  //mandaba un numero ahora manda un any
  async create(dto: CotizacionDto): Promise<CotizacionesEntity> {
    // Verificar y loguear la fecha recibida
    console.log('Tipo de fecha recibida:', typeof dto.fecha);
    const fechaRecibida = dto.fecha;
    console.log('Fecha recibida en UTC:', fechaRecibida);
    console.log('Fecha interpretada en hora local:', fechaRecibida);
    console.log('veri date' + new Date().getTimezoneOffset()); // Debería ser el mismo en ambos lugares
    // Crear la entidad Servicio
    dto.fecha = moment(dto.fecha).utc().toDate();
    console.log('fecha guardada en la bd' + dto.fecha);

    try {
      const cotizacion = this.cotizacionesRepository.create(dto);
      return await this.cotizacionesRepository.save(cotizacion);
    } catch (error) {
      throw error;
    }
  }

  //actualiza el estado del servicio
  async updateEstado(id: number, fieldName: string, newValue: any): Promise<any> {
    try {
        const cotizacion = await this.findById(id);
        if (!cotizacion) {
            throw new NotFoundException({ message: 'No se encontró el servicio' });
        }

        // Verificar que el campo a actualizar existe en el modelo de Servicio
        if (!(fieldName in cotizacion)) {
            throw new BadRequestException({ message: 'Campo a actualizar no válido' });
        }

        cotizacion[fieldName] = newValue;

        await this.cotizacionesRepository.save(cotizacion);

        return { message: 'Estado de cotización actualizado' };
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
    const cotizacion = await this.findById(id);
    if (!cotizacion) {
      throw new NotFoundException({ message: 'No se encontró la cotizacion' });
    }

    cotizacion.eliminado = 1; // Marcar como eliminada
    await this.cotizacionesRepository.save(cotizacion);

    return { message: 'Cotizacion eliminada' };
  }
}
