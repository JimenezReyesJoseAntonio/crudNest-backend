import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { PdfCotizacionService } from './pdf-cotizacion.service';

@Controller('pdf-cotizacion')
export class PdfCotizacionController {
    constructor(private readonly pdfCotizacion: PdfCotizacionService) { }
    
    @Get('generate/:id')
    async generatePdf(@Param('id') id: number, @Res() res): Promise<void> {
      const data = await this.pdfCotizacion.getDataById(id); // Obtiene datos de la base de datos
      const pdfBuffer = await this.pdfCotizacion.generatePDF(data); // Genera PDF a partir de los datos
  
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=example.pdf',
        'Content-Length': pdfBuffer.length.toString(),
      });
  
      res.end(pdfBuffer);
    }

    
  @Get('generatepdf/:id')
  async generatePdfCarta(@Param('id', ParseIntPipe) id: number, @Res({ passthrough: true }) res): Promise<void> {
    const data = await this.pdfCotizacion.getDataById(id); // Obtiene datos de la base de datos
    const pdfUrl = await this.pdfCotizacion.generatePdfCotizacion(data); // Genera PDF a partir de los datos y obtiene la URL

    //await this.pdfUrlService.savePdfUrl(id, pdfUrl); // Guarda la URL en la base de datos

    res.json({ url: pdfUrl }); // Devuelve la URL como respuesta JSON

  }


}
