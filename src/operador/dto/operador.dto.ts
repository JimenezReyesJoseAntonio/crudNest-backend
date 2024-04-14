import { EstatusDto } from "./estatus.dto";

export class OperadorDto{
nombre: string;
apellidoPaterno: string;
apellidoMaterno: string;
numTelefono: string;
rfc?:string;
curp:string;
nss?:string;
direccion: string;
codigoPostal: number;
licencia: string;
estatus:EstatusDto;

}