import { EstatusGruaEntity } from "src/estatus-grua/estatus-grua.entity";
import { GruaEstatusDto } from "./gruaEstatusDto";

export class GruaDto{
    noEco: number;
    placa: string;
    serie: string;
    noPermiso: string;
    aseguradora: string;
    noPoliza:string;
    ano:number;
    kilometraje: number;
    eliminado: number;
    estatusGrua: EstatusGruaEntity;

}