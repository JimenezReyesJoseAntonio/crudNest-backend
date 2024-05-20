import { Injectable } from '@nestjs/common';
import { OperadorEntity } from 'src/operador/operador.entity';
import { OperadorService } from 'src/operador/operador.service';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ExcelOperadoresService {
    constructor(private readonly operadorService: OperadorService) {}

    async generateExcel(): Promise<Buffer> {
        const operadores: OperadorEntity[] = await this.operadorService.getAll();
    
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Operadores');
    
        worksheet.addRow([
          'ID','NOMBRE','APELLIDO PATERNO','APELLIDO MATERNO','NUMERO DE TELEFONO','RFC','CURP',
          'NSS','DIRECCION','CODIGO POSTAL', 'LICENCIA','ESTATUS OPERADOR','ELIMINADO'
        ]);
    
        operadores.forEach(operador => {
          worksheet.addRow([
            operador.id, operador.nombre, operador.apellidoPaterno, operador.apellidoMaterno, operador.numTelefono,
            operador.rfc,operador.curp,operador.nss, operador.direccion,  operador.codigoPostal, operador.licencia,
            operador.estatusOperador?.nombreEstatus ?? '', operador.eliminado
          ]);
        });
    
        const buffer = await workbook.xlsx.writeBuffer() as Buffer;
        return buffer;
      }

}
