import { Module } from '@nestjs/common';
import { PdfCotizacionController } from './pdf-cotizacion.controller';
import { PdfCotizacionService } from './pdf-cotizacion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CotizacionesEntity } from 'src/cotizaciones/cotizaciones.entity';
import { CotizacionesRepository } from 'src/cotizaciones/cotizaciones.repository';
import { CotizacionesModule } from 'src/cotizaciones/cotizaciones.module';
import { CotizacionesService } from 'src/cotizaciones/cotizaciones.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CotizacionesEntity, CotizacionesRepository]), // Importa TypeOrmModule y proporciona los repositorios necesarios
    CotizacionesModule,
],
  controllers: [PdfCotizacionController],
  providers: [PdfCotizacionService,CotizacionesService]
})
export class PdfCotizacionModule {}
