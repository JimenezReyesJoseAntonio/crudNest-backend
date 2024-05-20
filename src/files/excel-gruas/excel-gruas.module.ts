import { Module } from '@nestjs/common';
import { ExcelGruasController } from './excel-gruas.controller';
import { ExcelGruasService } from './excel-gruas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GruaEntity } from 'src/grua/grua.entity';
import { GruaRepository } from 'src/grua/grua.repository';
import { GruaModule } from 'src/grua/grua.module';
import { GruaService } from 'src/grua/grua.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([GruaEntity, GruaRepository]), // Importa TypeOrmModule y proporciona los repositorios necesarios
    GruaModule,
],
  controllers: [ExcelGruasController],
  providers: [ExcelGruasService,GruaService]
})
export class ExcelGruasModule {}
