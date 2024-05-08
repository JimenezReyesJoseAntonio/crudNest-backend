import { ClienteDto } from "src/cliente/dto/cliente.dto";
import { MarcaDto } from "src/marca/dto/marca.dto";
import { ModeloDto } from "src/modelo/dto/modelo.dto";

export class VehiculoDto{
    tipoVehiculo: string;
    marca: MarcaDto;
    modelo:ModeloDto;
    placas: string;
    serie: string;
    color: string;
    ano:number;
    cliente: ClienteDto;
    eliminado: number;

}