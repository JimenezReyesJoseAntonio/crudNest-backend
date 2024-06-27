import { MarcaDto } from "src/marca/dto/marca.dto";
import { ModeloDto } from "src/modelo/dto/modelo.dto";
import { TiposVehiculoDto } from "src/tipos-vehiculo/dto/tipos-vehiculo.dto";
import { CreateUsuarioDto } from "src/usuario/dto/create-usuario.dto";

export class CotizacionDto{
    id?:number;
    fecha: Date;
    monto: number;
    ubicacionContacto: string;
    ubicacionTermino: string;
    numTelefono: string;
    usuario:CreateUsuarioDto;
    estado: string;
    tipoVehiculo: TiposVehiculoDto;
    marca: MarcaDto;
    modelo:ModeloDto;
    placas: string;
    serie: string;
    poliza: string;
    color: string;
    ano:number;
    eliminado: number;
    //falta grua
}