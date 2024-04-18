import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { VehiculoEntity } from './vehiculo.entity';
import { VehiculoRepository } from './vehiculo.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { VehiculoDto } from './dto/vehiculo.dto';

@Injectable()
export class VehiculoService {

    constructor(
        @InjectRepository(VehiculoEntity)
        private vehiculoRepository: VehiculoRepository
    ){}

    async getAll(): Promise<VehiculoEntity[]> {
        const list = await this.vehiculoRepository.find();
        if (!list.length) {
            throw new NotFoundException({message: 'La lista vehiculos esta vacia en estos momentos'});
        }
        return list;
    }

    async findById(id: number): Promise<VehiculoEntity | null> {
        const vehiculo = await this.vehiculoRepository.findOne({ where: { id: id } });
        if (!vehiculo) {
            throw new NotFoundException({message: 'no existe'});
        }
        return vehiculo;
    }

    async create(dto: VehiculoDto): Promise<any> {

        try {
            const vehiculo = this.vehiculoRepository.create(dto);
            console.log(vehiculo.id);
            console.log(vehiculo.marca);
   
            await this.vehiculoRepository.save(vehiculo);
            return {message: 'Vehiculo registrado'};
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') { // Este código de error es específico de MySQL
                throw new ConflictException({message: error.message});
            } else {
                // Maneja otros errores aquí
                throw error;
            }
        }
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
            vehiculo.color = dto.color ?? vehiculo.color;
            vehiculo.ano = dto.ano ?? vehiculo.ano;
            vehiculo.cliente = dto.cliente ?? vehiculo.cliente;
            
    
            
            await this.vehiculoRepository.save(vehiculo);
            
            return { message: 'Datos del vehiculo actualizados' };
        } catch (error) {
            // Manejar errores específicos
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException({ message:error.message });
            } else {
                throw error; // Relanzar otros errores
            }
        }
    }
    
    async delete(id: number): Promise<any> {
        const cliente = await this.findById(id);
        await this.vehiculoRepository.delete(cliente);
        return {message: 'vehiculo eliminado'};
    
    }

   

}
