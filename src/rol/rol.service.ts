import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolEntity } from './rol.entity';
import { RolRepository } from './rol.repository';
import { CreateRolDto } from './dto/create-rol.dto';

@Injectable()
export class RolService {

    constructor(
        @InjectRepository(RolEntity)
        private readonly rolRepository: RolRepository
    ) {}

    async getall(): Promise<RolEntity[]> {
        const roles = await this.rolRepository.find();
        if(!roles.length) throw new NotFoundException({message: 'no hay roles en la lista'});
        return roles;
    }

    async create(dto: CreateRolDto): Promise<any> {
        const exists = await this.rolRepository.findOne({where: {rolNombre: dto.rolNombre }});
        if(exists) throw new BadRequestException({message: 'ese rol ya existe'});
        await this.rolRepository.save(dto as RolEntity);
        return {message: 'Rol creado'};
    }
}
