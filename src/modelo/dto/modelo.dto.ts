import { MarcaEntity } from "src/marca/marca.entity";

export class ModeloDto {
    id: number; // Identificador único del estado
    nombre: string; // Descripción opcional del estado
    marcaId: number; // valor 0 si no esta eliminando , valor 1 si esta eliminado
    marca: MarcaEntity;

}
