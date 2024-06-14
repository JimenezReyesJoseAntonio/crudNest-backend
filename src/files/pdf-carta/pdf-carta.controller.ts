import { Controller, Res, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PdfCartaService } from './pdf-carta.service';

@Controller('pdf-carta')
export class PdfCartaController {

  constructor(private readonly pdfService: PdfCartaService) { }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.pdfService.getDataById(id);
  }
  
  @Get('generate/:id')
  async generatePdf(@Param('id') id: number, @Res() res): Promise<void> {
    const data = await this.pdfService.getDataById(id); // Obtiene datos de la base de datos
    const pdfBuffer = await this.pdfService.generatePDF(data); // Genera PDF a partir de los datos

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=example.pdf',
      'Content-Length': pdfBuffer.length.toString(),
    });

    res.end(pdfBuffer);
  }


}
