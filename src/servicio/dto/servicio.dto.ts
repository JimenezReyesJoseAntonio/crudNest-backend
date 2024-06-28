import { ClienteDto } from "src/cliente/dto/cliente.dto";
import { GruaDto } from "src/grua/dto/grua.dto";
import { OperadorDto } from "src/operador/dto/operador.dto";
import { CreateUsuarioDto } from "src/usuario/dto/create-usuario.dto";
import { VehiculoDto } from "src/vehiculo/dto/vehiculo.dto";

export class ServicioDto{
    folioServicio: string;
    fecha: Date;
    ubicacionSalida: string;
    ubicacionContacto: string;
    montoCobrado:number;
    observaciones:string;
    ubicacionTermino: string;
    estadoServicio: string;
    cliente: ClienteDto;
    vehiculo: VehiculoDto;
    operador: OperadorDto;
    grua: GruaDto;
    usuario:CreateUsuarioDto ;
    kmSalida: number;
    kmEntrada: number;
    eliminado: number;
    //falta grua
}