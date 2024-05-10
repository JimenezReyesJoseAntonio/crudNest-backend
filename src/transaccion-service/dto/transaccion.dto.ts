import { ClienteDto } from "src/cliente/dto/cliente.dto";
import { ServicioDto } from "src/servicio/dto/servicio.dto";
import { VehiculoDto } from "src/vehiculo/dto/vehiculo.dto";

export class TransaccionDto {
    clienteDto: ClienteDto;
    vehiculoDto: VehiculoDto;
    servicioDto: ServicioDto;
  }