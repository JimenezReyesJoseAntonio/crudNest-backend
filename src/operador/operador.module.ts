import { Module } from '@nestjs/common';
import { OperadorService } from './operador.service';
import { OperadorController } from './operador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperadorEntity } from './operador.entity';
import { EstatusService } from './estatus.service';
import { EstatusController } from './estatus.controller';
import { EstatusEntity } from './estatus.entity';

@Module({
  imports:[TypeOrmModule.forFeature([OperadorEntity])],
  providers: [OperadorService],
  controllers: [OperadorController]
})
export class OperadorModule {}
