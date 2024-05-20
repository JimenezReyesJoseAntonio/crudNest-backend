import { Module } from '@nestjs/common';
import { ExcelServiciosService } from './excel-servicios.service';
import { ExcelServiciosController } from './excel-servicios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioEntity } from 'src/servicio/servicio.entity';
import { ServicioRepository } from 'src/servicio/servicio.repository';
import { ServicioModule } from 'src/servicio/servicio.module';
import { ServicioService } from 'src/servicio/servicio.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServicioEntity, ServicioRepository]), // Importa TypeOrmModule y proporciona los repositorios necesarios
    ServicioModule,
],
  providers: [ExcelServiciosService,ServicioService],
  controllers: [ExcelServiciosController]
})
export class ExcelServiciosModule {}
