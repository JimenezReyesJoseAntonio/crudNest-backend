import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { RolEntity } from 'src/rol/rol.entity';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity, RolEntity, AuthRepository])],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
