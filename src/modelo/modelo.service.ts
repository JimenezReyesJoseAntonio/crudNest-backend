import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModeloEntity } from './modelo.entity';
import { ModeloRepository } from './modelo.repository';
import { ModeloDto } from './dto/modelo.dto';

@Injectable()
export class ModeloService {
    constructor(
        @InjectRepository(ModeloEntity)
        private modeloRepository: ModeloRepository
    ) { }

    async getAll(): Promise<ModeloEntity[]> {
        const list = await this.modeloRepository.find();
        if (!list.length) {
            throw new NotFoundException({ message: 'La lista modelos esta vacia en estos momentos' });
        }
        return list;
    }

    async create(dto: ModeloDto): Promise<ModeloEntity> {
        const { nombre, marcaId } = dto;

        // Verifica si el modelo ya existe para la misma marca
        const existingModelo = await this.modeloRepository.findOne({ where: { nombre, marcaId } });

        if (existingModelo) {
            throw new ConflictException('El modelo ya existe para esta marca');
        }

        const modelo = this.modeloRepository.create(dto);
        return this.modeloRepository.save(modelo);
    }

    async findById(id: number): Promise<ModeloEntity | null> {
        const modelo = await this.modeloRepository.findOne({ where: { id: id } });
        if (!modelo) {
            throw new NotFoundException({ message: 'no existe el modelo' });
        }
        return modelo;
    }

    async update(id: number, dto: ModeloDto): Promise<ModeloEntity> {
        const modelo = await this.findById(id);
        if (!modelo) {
            throw new NotFoundException({ message: 'No se encontró el modelo' });
        }

        const { nombre } = dto;

        // Verifica si otro modelo con el mismo nombre y marca ya existe
        const existingModelo = await this.modeloRepository.findOne({ where: { nombre } });
        if (existingModelo && existingModelo.id !== id) {
            throw new ConflictException('Otro modelo con el mismo nombre y marca ya existe');
        }

        // Actualiza los campos del modelo
        modelo.nombre = nombre;

        return this.modeloRepository.save(modelo);
    }

    async delete(id: number): Promise<any> {
        const modelo = await this.findById(id);
        if (!modelo) {
            throw new NotFoundException({ message: 'No se encontró el modelo' });
        }

        modelo.eliminado = 1; // Marcar como eliminada
        await this.modeloRepository.save(modelo);

        return { message: 'modelo eliminado' };
    }

}
