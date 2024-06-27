import { Module } from '@nestjs/common';
import { CotizacionesController } from './cotizaciones.controller';
import { CotizacionesService } from './cotizaciones.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CotizacionesEntity } from './cotizaciones.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CotizacionesEntity])],
  controllers: [CotizacionesController],
  providers: [CotizacionesService]
})
export class CotizacionesModule {}
