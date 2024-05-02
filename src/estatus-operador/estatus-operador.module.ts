import { Module } from '@nestjs/common';
import { EstatusOperadorService } from './estatus-operador.service';
import { EstatusOperadorController } from './estatus-operador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstatusOperadorEntity } from './estatus-operador.entity';
import { OperadorEntity } from 'src/operador/operador.entity';

@Module({
  imports:[TypeOrmModule.forFeature([EstatusOperadorEntity,OperadorEntity])],
  providers: [EstatusOperadorService],
  controllers: [EstatusOperadorController]
})
export class EstatusOperadorModule {}
