import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MarcaEntity } from './marca.entity';
import { MarcaRepository } from './marca.repository';
import { MarcaDto } from './dto/marca.dto';

@Injectable()
export class MarcaService {
    constructor(
        @InjectRepository(MarcaEntity)
        private marcaRepository: MarcaRepository
    ) { }

    async getAll(): Promise<MarcaEntity[]> {
        const list = await this.marcaRepository.find();
        if (!list.length) {
            throw new NotFoundException({ message: 'La lista marcas esta vacia en estos momentos' });
        }
        return list;
    }

    async create(dto: MarcaDto): Promise<MarcaEntity> {
        const { nombre } = dto;

        // Verifica si la marca ya existe
        const existingMarca = await this.marcaRepository.findOne({ where: { nombre } });

        if (existingMarca) {
            throw new ConflictException('La marca ya existe');
        }

        const marca = this.marcaRepository.create(dto);
        return this.marcaRepository.save(marca);
    }

    async findById(id: number): Promise<MarcaEntity | null> {
        const marca = await this.marcaRepository.findOne({ where: { id: id } });
        if (!marca) {
            throw new NotFoundException({ message: 'no existe la marca' });
        }
        return marca;
    }

    async update(id: number, dto: MarcaDto): Promise<MarcaEntity> {
        const marca = await this.findById(id);
        if (!marca) {
            throw new NotFoundException({ message: 'No se encontró la marca' });
        }

        const { nombre } = dto;

        // Verifica si otra marca con el mismo nombre ya existe
        const existingMarca = await this.marcaRepository.findOne({ where: { nombre } });
        if (existingMarca && existingMarca.id !== id) {
            throw new ConflictException('Otra marca con el mismo nombre ya existe');
        }

        // Actualiza los campos de la marca
        marca.nombre = nombre;

        return this.marcaRepository.save(marca);
    }

    async delete(id: number): Promise<any> {
        const marca = await this.findById(id);
        if (!marca) {
            throw new NotFoundException({ message: 'No se encontró la marca' });
        }

        marca.eliminado = 1; // Marcar como eliminada
        await this.marcaRepository.save(marca);

        return { message: 'marca eliminada' };
    }

}
