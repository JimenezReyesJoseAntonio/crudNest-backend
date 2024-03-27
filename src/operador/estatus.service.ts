import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstatusEntity } from './estatus.entity';
import { EstatusRepository } from './estatus.repository';

@Injectable()
export class EstatusService {
    constructor(
        @InjectRepository(EstatusEntity)
        private estatusRepository: EstatusRepository
    ){}

    async getAll(): Promise<EstatusEntity[]> {
        const list = await this.estatusRepository.find();
        if (!list.length) {
            throw new NotFoundException({message: 'la lista esta vacia'});
        }
        return list;
    }


}
