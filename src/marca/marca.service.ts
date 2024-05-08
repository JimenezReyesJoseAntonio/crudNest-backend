import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MarcaEntity } from './marca.entity';
import { MarcaRepository } from './marca.repository';

@Injectable()
export class MarcaService {
    constructor(
        @InjectRepository(MarcaEntity)
        private marcaRepository: MarcaRepository
    ){}

    async getAll(): Promise<MarcaEntity[]> {
        const list = await this.marcaRepository.find();
        if (!list.length) {
            throw new NotFoundException({message: 'La lista marcas esta vacia en estos momentos'});
        }
        return list;
    }
}
