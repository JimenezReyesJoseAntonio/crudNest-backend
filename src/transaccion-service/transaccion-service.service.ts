import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ClienteService } from 'src/cliente/cliente.service';
import { ClienteDto } from 'src/cliente/dto/cliente.dto';
import { ServicioDto } from 'src/servicio/dto/servicio.dto';
import { ServicioService } from 'src/servicio/servicio.service';
import { VehiculoDto } from 'src/vehiculo/dto/vehiculo.dto';
import { VehiculoService } from 'src/vehiculo/vehiculo.service';
import { EntityManager } from 'typeorm';
import { TransaccionDto } from './dto/transaccion.dto';

@Injectable()
export class TransaccionServiceService {

    constructor(
        @InjectEntityManager() private readonly entityManager: EntityManager,
        private readonly clienteService: ClienteService,
        private readonly vehiculoService: VehiculoService,
        private readonly servicioService: ServicioService,
      ) {}
    
      async crearClienteVehiculoServicio(transaccionData: TransaccionDto ): Promise<void> {
        await this.entityManager.transaction(async (manager) => {
          try {
            const Cliente = await this.clienteService.create(transaccionData.clienteDto, manager);
            transaccionData.vehiculoDto.cliente = Cliente.id;
            //dtoVehiculo.cliente = idCliente; // Asignar el ID del cliente al vehículo
            const Vehiculo = await this.vehiculoService.create(transaccionData.vehiculoDto, manager);
            console.error('desde aqui');
            //console.error(dtoVehiculo);
            transaccionData.servicioDto.cliente = Cliente.id;
            transaccionData.servicioDto.vehiculo = Vehiculo.id;

            //dtoServicio.cliente = idCliente; // Asignar el ID del cliente al servicio
            //dtoServicio.vehiculo = idVehiculo; // Asignar el ID del vehículo al servicio
            await this.servicioService.create(transaccionData.servicioDto, manager); 
            
            console.error(transaccionData.clienteDto);
            console.error(transaccionData.vehiculoDto);
            console.error(transaccionData.servicioDto);


          } catch (error) {
            // Manejar errores dentro de la transacción
            throw error;
          }
        });
      }
}
