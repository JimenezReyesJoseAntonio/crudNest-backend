import { Injectable, NotFoundException } from '@nestjs/common';
import { TiposVehiculoEntity } from './tipos-vehiculo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TiposVehiculoRepository } from './tipos-vehiculo.repository';

@Injectable()
export class TiposVehiculoService {
    constructor(
        @InjectRepository(TiposVehiculoEntity)
        private tiposVRepository: TiposVehiculoRepository
    ){}

    async getAll(): Promise<TiposVehiculoEntity[]> {
        const list = await this.tiposVRepository.find();
        if (!list.length) {
            throw new NotFoundException({message: 'La lista tipos vehiculo esta vacia en estos momentos'});
        }
        return list;
    }

}
