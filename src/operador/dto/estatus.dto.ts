export class EstatusDto {
    id: number; // Identificador único del estado
    descripcion: string; // Descripción opcional del estado
    eliminado: number; // valor 0 si no esta eliminando , valor 1 si esta eliminado
}
