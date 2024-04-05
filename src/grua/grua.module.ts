import { Module } from '@nestjs/common';
import { GruaService } from './grua.service';
import { GruaController } from './grua.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GruaEntity } from './grua.entity';
import { GruaEstatusEntity } from './gruaEstatus.entity';
import { GruaEstatusController } from './grua-estatus.controller';
import { GruaEstatusService } from './grua-estatus.service';

@Module({
  imports:[TypeOrmModule.forFeature([GruaEntity,GruaEstatusEntity])],
  controllers: [GruaController, GruaEstatusController],
  providers: [GruaService, GruaEstatusService]
})
export class GruaModule {}
