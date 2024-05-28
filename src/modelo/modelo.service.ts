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
    ){}

    async getAll(): Promise<ModeloEntity[]> {
        const list = await this.modeloRepository.find();
        if (!list.length) {
            throw new NotFoundException({message: 'La lista modelos esta vacia en estos momentos'});
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


}
