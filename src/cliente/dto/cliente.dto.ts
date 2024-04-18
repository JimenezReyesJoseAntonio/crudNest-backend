import { ClienteTipoDto } from "src/cliente-tipo/dto/cliente-tipo.dto";
import { VehiculoEntity } from "src/vehiculo/vehiculo.entity";

export class ClienteDto{
    id:number;
    numTelefono: string;
    vehiculos: VehiculoEntity[];
    clienteTipo: ClienteTipoDto;
    

}