import { Controller, Get, Query, Res } from '@nestjs/common';
import { ExcelServiciosService } from './excel-servicios.service';
import { Response } from 'express';
import * as moment from 'moment';

@Controller('api/excel-servicios')
export class ExcelServiciosController {
  constructor(private readonly excelService: ExcelServiciosService) {}

  @Get('download/excel')
  async downloadExcel(@Res() res: Response): Promise<void> {
    try {
      const buffer: Buffer = await this.excelService.generateExcel();

      console.log('Buffer Length:', buffer.length);

      res.set({
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename=servicios.xlsx',
        'Content-Length': buffer.length,
      });

      res.end(buffer); // Usar res.end para enviar el buffer
    } catch (error) {
      console.error('Error while generating Excel file:', error);
      res.status(500).send('Error generating Excel file');
    }
  }


  @Get('servicios')
async getServiciosExcel(
  @Query('day') day: string,
  @Query('startDate') startDate: string,
  @Query('endDate') endDate: string,
  @Res() res: Response
) {
  let buffer: Buffer;

  if (day) {
    buffer = await this.excelService.generateExcelByDay(day);
  } else if (startDate && endDate) {
    const start = moment(startDate).startOf('day').utc().toDate();
    const end = moment(endDate).endOf('day').utc().toDate();
    buffer = await this.excelService.generateExcelByDateRange(start, end);
  } else {
    res.status(400).send('Invalid date parameters');
    return;
  }

  const filename = day ? `servicios_${day}.xlsx` : `servicios_${startDate}_to_${endDate}.xlsx`;

  res.set({
    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'Content-Disposition': `attachment; filename="${filename}"`,
  });
  res.end(buffer);
}

}
