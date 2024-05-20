import { Module } from '@nestjs/common';
import { ExcelOperadoresController } from './excel-operadores.controller';
import { ExcelOperadoresService } from './excel-operadores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperadorEntity } from 'src/operador/operador.entity';
import { OperadorRepository } from 'src/operador/operador.repository';
import { OperadorModule } from 'src/operador/operador.module';
import { OperadorService } from 'src/operador/operador.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([OperadorEntity, OperadorRepository]), // Importa TypeOrmModule y proporciona los repositorios necesarios
        OperadorModule,
    ],
  controllers: [ExcelOperadoresController],
  providers: [ExcelOperadoresService,OperadorService]
})
export class ExcelOperadoresModule {}
