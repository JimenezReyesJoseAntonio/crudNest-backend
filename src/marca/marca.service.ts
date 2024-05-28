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
    ){}

    async getAll(): Promise<MarcaEntity[]> {
        const list = await this.marcaRepository.find();
        if (!list.length) {
            throw new NotFoundException({message: 'La lista marcas esta vacia en estos momentos'});
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
      
}
