import { Module } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { VehiculoController } from './vehiculo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculoEntity } from './vehiculo.entity';

@Module({
  imports:[TypeOrmModule.forFeature([VehiculoEntity])],
  providers: [VehiculoService],
  controllers: [VehiculoController]
})
export class VehiculoModule {}
