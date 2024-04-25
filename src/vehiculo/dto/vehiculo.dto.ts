import { ClienteDto } from "src/cliente/dto/cliente.dto";

export class VehiculoDto{
    tipoVehiculo: string;
    marca: string;
    modelo: string;
    placas: string;
    serie: string;
    color: string;
    ano:number;
    cliente: ClienteDto;
    eliminado: number;

}