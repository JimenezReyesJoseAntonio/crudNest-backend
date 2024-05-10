import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ServicioEntity } from './servicio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicioRepository } from './servicio.repository';
import { ServicioDto } from './dto/servicio.dto';
import { EntityManager } from 'typeorm';

@Injectable()
export class ServicioService {
  constructor(
    @InjectRepository(ServicioEntity)
    private serviceRepository: ServicioRepository,
  ) {}

  async getAll(): Promise<ServicioEntity[]> {
    const list = await this.serviceRepository.find();
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


}
