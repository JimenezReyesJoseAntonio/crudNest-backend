import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { VehiculoEntity } from './vehiculo.entity';
import { VehiculoRepository } from './vehiculo.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { VehiculoDto } from './dto/vehiculo.dto';
import { EntityManager } from 'typeorm';

@Injectable()
export class VehiculoService {

    constructor(
        @InjectRepository(VehiculoEntity)
        private vehiculoRepository: VehiculoRepository
    ) { }

    async getAll(): Promise<VehiculoEntity[]> {
        const list = await this.vehiculoRepository.find();
        if (!list.length) {
            throw new NotFoundException({ message: 'La lista vehiculos esta vacia en estos momentos' });
        }
        return list;
    }

    async findById(id: number): Promise<VehiculoEntity | null> {
        const vehiculo = await this.vehiculoRepository.findOne({ where: { id: id } });
        if (!vehiculo) {
            throw new NotFoundException({ message: 'no existe' });
        }
        return vehiculo;
    }

    //mandaba un numero ahora manda un any
    async create(dto: VehiculoDto, manager?: EntityManager): Promise<any> {
        const vehiculo = this.vehiculoRepository.create(dto);
        const vehiculoGuardado = await manager.save(vehiculo);
        return vehiculoGuardado;
    }



    async update(id: number, dto: VehiculoDto): Promise<any> {
        try {
            const vehiculo = await this.findById(id);
            if (!vehiculo) {
                throw new NotFoundException({ message: 'No se encontró el vehiculo' });
            }

            vehiculo.tipoVehiculo = dto.tipoVehiculo ?? vehiculo.tipoVehiculo;
            vehiculo.marca = dto.marca ?? vehiculo.marca;
            vehiculo.modelo = dto.modelo ?? vehiculo.modelo;
            vehiculo.placas = dto.placas ?? vehiculo.placas;
            vehiculo.serie = dto.serie ?? vehiculo.serie;
            vehiculo.poliza = dto.poliza ?? vehiculo.poliza;
            vehiculo.color = dto.color ?? vehiculo.color;
            vehiculo.ano = dto.ano ?? vehiculo.ano;
            vehiculo.cliente = dto.cliente ?? vehiculo.cliente;



            await this.vehiculoRepository.save(vehiculo);

            return { message: 'Datos del vehiculo actualizados' };
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
        const vehiculo = await this.findById(id);
        if (!vehiculo) {
            throw new NotFoundException({ message: 'No se encontró el vehiculo' });
        }

        vehiculo.eliminado = 1; // Marcar como eliminada
        await this.vehiculoRepository.save(vehiculo);

        return { message: 'vehiculo eliminado' };
    }



}
