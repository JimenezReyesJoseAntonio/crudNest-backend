import { Module } from '@nestjs/common';
import { EstatusGruaService } from './estatus-grua.service';
import { EstatusGruaController } from './estatus-grua.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstatusGruaEntity } from './estatus-grua.entity';
import { GruaEntity } from 'src/grua/grua.entity';

@Module({
  imports:[TypeOrmModule.forFeature([EstatusGruaEntity,GruaEntity])],
  providers: [EstatusGruaService],
  controllers: [EstatusGruaController]
})
export class EstatusGruaModule {}
