import { Module } from '@nestjs/common';
import { PdfCartaController } from './pdf-carta.controller';
import { PdfCartaService } from './pdf-carta.service';
import { ServicioModule } from 'src/servicio/servicio.module';
import { ServicioService } from 'src/servicio/servicio.service';
import { ServicioRepository } from 'src/servicio/servicio.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioEntity } from 'src/servicio/servicio.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ServicioEntity, ServicioRepository]), // Importa TypeOrmModule y proporciona los repositorios necesarios
        ServicioModule,
    ],
    controllers: [PdfCartaController],
    providers: [PdfCartaService, ServicioService] // Agrega ServicioService a la lista de providers
})
export class PdfCartaModule {}
