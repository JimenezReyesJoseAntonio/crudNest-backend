import { ModeloEntity } from "src/modelo/modelo.entity";

export class MarcaDto {
    id: number; // Identificador único del estado
    nombre: string; // Descripción opcional del estado
    modelos: ModeloEntity[];
    eliminado: number;
}
