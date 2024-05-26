import { Injectable } from '@nestjs/common';
import { GruaEntity } from 'src/grua/grua.entity';
import { GruaService } from 'src/grua/grua.service';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ExcelGruasService {
    constructor(private readonly gruaService: GruaService) {}
    async generateExcel(): Promise<Buffer> {
        const gruas: GruaEntity[] = await this.gruaService.getAll();
    
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Gruas');
    
        worksheet.addRow([
          'NO ECO','PLACA','SERIE','NO PERMISO','ASEGURADORA','NO POLIZA','AÑO',
          'KILOMETRAJE','ELIMINADO'
        ]);
    
        gruas.forEach(grua => {
          worksheet.addRow([
            grua.noEco,grua.placa, grua.serie,grua.noPermiso, grua.aseguradora,grua.noPoliza, grua.ano,
             grua.kilometraje, grua.eliminado

          ]);
        });
    
        const buffer = await workbook.xlsx.writeBuffer() as Buffer;
        return buffer;
      }


}
