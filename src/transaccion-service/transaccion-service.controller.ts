import { Body, Controller, Post } from '@nestjs/common';
import { TransaccionServiceService } from './transaccion-service.service';
import { ClienteDto } from 'src/cliente/dto/cliente.dto';
import { VehiculoDto } from 'src/vehiculo/dto/vehiculo.dto';
import { ServicioDto } from 'src/servicio/dto/servicio.dto';
import { TransaccionDto } from './dto/transaccion.dto';

@Controller('transaccion-service')
export class TransaccionServiceController {

    constructor(private readonly transaccionService: TransaccionServiceService) {}

    @Post()
  async crearClienteVehiculoServicio( 
    @Body() transaccionData: TransaccionDto
  ): Promise<void> {
    try {
      await this.transaccionService.crearClienteVehiculoServicio(transaccionData);
    } catch (error) {
      // Manejar errores aquí . , dtoVehiculo, dtoServicio
      console.error('Error en la transacción desde  el controlador:', error);
      throw error; // Puedes lanzar el error para que sea manejado por el middleware global de excepciones .
      //@Body() dtoVehiculo: VehiculoDto,
          //@Body() dtoServicio: ServicioDto,
    
    }
  }

}
