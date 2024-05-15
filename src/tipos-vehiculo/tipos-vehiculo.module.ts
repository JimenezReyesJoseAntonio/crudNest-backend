import { Module } from '@nestjs/common';
import { TiposVehiculoService } from './tipos-vehiculo.service';
import { TiposVehiculoController } from './tipos-vehiculo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposVehiculoEntity } from './tipos-vehiculo.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TiposVehiculoEntity])],
  providers: [TiposVehiculoService],
  controllers: [TiposVehiculoController]
})
export class TiposVehiculoModule {}
