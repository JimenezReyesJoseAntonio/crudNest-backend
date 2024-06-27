import { Controller, Get, Res } from '@nestjs/common';
import { ExcelOperadoresService } from './excel-operadores.service';
import { Response } from 'express';

@Controller('excel-operadores')
export class ExcelOperadoresController {

    constructor(private readonly excelService: ExcelOperadoresService) {}

    @Get('download/excel')
  async downloadExcel(@Res() res: Response): Promise<void> {
    try {
      const buffer: Buffer = await this.excelService.generateExcel();

      console.log('Buffer Length:', buffer.length);

      res.set({
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename=operadores.xlsx',
        'Content-Length': buffer.length,
      });

      res.end(buffer); // Usar res.end para enviar el buffer
    } catch (error) {
      console.error('Error while generating Excel file:', error);
      res.status(500).send('Error generating Excel file');
    }
  }

}
