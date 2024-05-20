import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { ServicioEntity } from 'src/servicio/servicio.entity';
import { ServicioService } from 'src/servicio/servicio.service';
import { Buffer } from 'buffer';

@Injectable()
export class ExcelServiciosService {
  constructor(private readonly servicioService: ServicioService) {}

  async generateExcel(): Promise<Buffer> {
    const servicios: ServicioEntity[] = await this.servicioService.getAll();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Servicios');

    worksheet.addRow([
      'Folio','Fecha','Operador','ECO Grua','Ubicación de salida','Ubicación de contacto','Ubicación de termino',
      'Monto cobrado','Cliente','Datos cliente', 'Observaciones','Asignacion servicio','Tipo vehiculo','Marca',
      'Modelo','Placas','Color','Año','Serie','Estado servicio'
    ]);

    servicios.forEach(servicio => {
      worksheet.addRow([
        servicio.folioServicio, servicio.fecha,servicio.operador?.nombre, servicio.grua?.noEco,servicio.ubicacionSalida,
        servicio.ubicacionContacto,servicio.ubicacionTermino,servicio.montoCobrado,servicio.cliente?.clienteTipo?.nombreCliente ?? '',
        servicio.cliente?.numTelefono ?? '',servicio.observaciones, servicio.usuario?.nombre ?? '', servicio.vehiculo?.tipoVehiculo?.nombre ?? '',
         servicio.vehiculo?.marca?.nombre ?? '', servicio.vehiculo?.modelo?.nombre ?? '',servicio.vehiculo?.placas ?? '',
         servicio.vehiculo?.color ?? '', servicio.vehiculo?.ano ?? '',servicio.vehiculo?.serie ?? '', servicio.estadoServicio
      ]);
    });

    const buffer = await workbook.xlsx.writeBuffer() as Buffer;
    return buffer;
  }
}
