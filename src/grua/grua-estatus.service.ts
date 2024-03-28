import { Injectable, NotFoundException } from '@nestjs/common';
import { GruaEstatusEntity } from './gruaEstatus.entity';
import { GruaEstatusRepository } from './gruaEstatusRepository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GruaEstatusService {
    constructor(
        @InjectRepository(GruaEstatusEntity)
        private estatusRepository: GruaEstatusRepository
    ){}

    async getAll(): Promise<GruaEstatusEntity[]> {
        const list = await this.estatusRepository.find();
        if (!list.length) {
            throw new NotFoundException({message: 'la lista esta vacia'});
        }
        return list;
    }
}
