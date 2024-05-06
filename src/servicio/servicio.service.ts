import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ServicioEntity } from './servicio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicioRepository } from './servicio.repository';
import { ServicioDto } from './dto/servicio.dto';

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
    const operador = await this.serviceRepository.findOne({
      where: { id: id },
      relations: ['cliente', 'vehiculo', 'operador', 'grua', 'usuario'], // Cargar las relaciones necesarias
    });
    if (!operador) {
      throw new NotFoundException({ message: 'no existe el servicio' });
    }
    return operador;
  }

  async create(dto: ServicioDto): Promise<any> {

    try {
      const servicio = this.serviceRepository.create(dto);
      console.log(servicio.folioServicio);
      await this.serviceRepository.save(servicio);
      return servicio;// valor que ocuparemos para el folio del servicio
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        // Este código de error es específico de MySQL
        throw new ConflictException({
          message: 'Datos duplicados con otro servcio, servicio no creado',
        });
      } else {
        // Maneja otros errores aquí
        throw error;
      }
    }
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
