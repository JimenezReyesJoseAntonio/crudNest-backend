import { Module } from '@nestjs/common';
import { OperadorService } from './operador.service';
import { OperadorController } from './operador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperadorEntity } from './operador.entity';

@Module({
  imports:[TypeOrmModule.forFeature([OperadorEntity])],
  providers: [OperadorService],
  controllers: [OperadorController]
})
export class OperadorModule {}
