import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModeloEntity } from './modelo.entity';
import { ModeloRepository } from './modelo.repository';

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


}
