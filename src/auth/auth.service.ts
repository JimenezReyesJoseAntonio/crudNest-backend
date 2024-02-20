import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolEntity } from 'src/rol/rol.entity';
import { RolRepository } from 'src/rol/rol.repository';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { AuthRepository } from './auth.repository';
import { NuevoUsuarioDto } from './dto/nuevo-usuario.dto';
import { RolNombre } from 'src/rol/rol.enum';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(RolEntity)
        private readonly rolRepository: RolRepository,
        @InjectRepository(UsuarioEntity)
        private readonly authRepository: AuthRepository

    ) {}
    
    async getall(): Promise<UsuarioEntity[]> {
        const usuarios = await this.authRepository.find();
        if(!usuarios.length) throw new NotFoundException( {message: 'no hay usuarios en la lista'});
        return usuarios;
    }

    async create(dto: NuevoUsuarioDto): Promise<any> {
        const {nombreUsuario, email} = dto;
        const exists = await this.authRepository.findOne({where: [{nombreUsuario: nombreUsuario}, {email: email}]});
        if(exists) throw new BadRequestException( {message: 'ese usuario ya existe'});
        const rolUser = await this.rolRepository.findOne({where: {rolNombre: RolNombre.USER}});
        if(!rolUser) throw new InternalServerErrorException( {message: 'los roles aun no has sido creados'});
        const user = this.authRepository.create(dto);
        user.roles = [rolUser];
        await this.authRepository.save(user);
        return  {message: 'usuario creado'};
    }
    
}
