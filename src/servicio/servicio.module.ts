import { Module } from '@nestjs/common';
import { ServicioService } from './servicio.service';
import { ServicioController } from './servicio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioEntity } from './servicio.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ServicioEntity])],
  providers: [ServicioService],
  controllers: [ServicioController]
})
export class ServicioModule {}
