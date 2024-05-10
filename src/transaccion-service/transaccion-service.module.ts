import { Module } from '@nestjs/common';
import { TransaccionServiceService } from './transaccion-service.service';
import { TransaccionServiceController } from './transaccion-service.controller';
import { ClienteService } from 'src/cliente/cliente.service';
import { ClienteEntity } from 'src/cliente/cliente.entity';
import { ClienteRepository } from 'src/cliente/cliente.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculoService } from 'src/vehiculo/vehiculo.service';
import { VehiculoEntity } from 'src/vehiculo/vehiculo.entity';
import { VehiculoRepository } from 'src/vehiculo/vehiculo.repository';
import { ServicioService } from 'src/servicio/servicio.service';
import { ServicioEntity } from 'src/servicio/servicio.entity';
import { ServicioRepository } from 'src/servicio/servicio.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClienteEntity,
      ClienteRepository,
      VehiculoEntity,
      VehiculoRepository,
      ServicioEntity,
      ServicioRepository
    ]), // Importa TypeOrmModule y proporciona los repositorios necesarios
  ],
  providers: [ClienteService, VehiculoService, ServicioService, TransaccionServiceService],
  controllers: [TransaccionServiceController]
})
export class TransaccionServiceModule { }
