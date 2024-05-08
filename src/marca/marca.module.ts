import { Module } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { MarcaController } from './marca.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarcaEntity } from './marca.entity';

@Module({
  imports:[TypeOrmModule.forFeature([MarcaEntity])],
  providers: [MarcaService],
  controllers: [MarcaController]
})
export class MarcaModule {}
