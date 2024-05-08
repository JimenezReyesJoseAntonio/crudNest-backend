import { Module } from '@nestjs/common';
import { ModeloService } from './modelo.service';
import { ModeloController } from './modelo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModeloEntity } from './modelo.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ModeloEntity])],
  providers: [ModeloService],
  controllers: [ModeloController]
})
export class ModeloModule {}
