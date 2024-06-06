import { Injectable } from '@nestjs/common';
const PDFDocument = require('pdfkit-table');

import { join, resolve } from 'path';
import { ServicioService } from 'src/servicio/servicio.service';
import { ServicioDto } from 'src/servicio/dto/servicio.dto';

@Injectable()
export class PdfCartaService {
    constructor(private readonly serviceService: ServicioService) { }

    async getDataById(id: number): Promise<any> {
        const service = await this.serviceService.findById(id); // Utiliza el método findById
        if (!service) {
            throw new Error('No se encontró el servicio con el ID especificado');
        }
        return service; // Retorna el objeto ServicioEntity
    }


    async generarPDF(): Promise<Buffer> {
        const pdfBuffer: Buffer = await new Promise(resolve => {
            const doc = new PDFDocument(
                {
                    size: "LETTER",
                    bufferPages: true,
                    autoFirstPage: false,
                })

            let pageNumber = 0;
            doc.on('pageAdded', () => {
                pageNumber++
                let bottom = doc.page.margins.bottom;

                if (pageNumber > 1) {
                    doc.image(join(process.cwd(), "uploads/GVlogo.png"), doc.page.width - 100, 5, { fit: [80, 80], align: 'center' })
                    doc.moveTo(50, 55)
                        .lineTo(doc.page.width - 50, 55)
                        .stroke();
                }

                doc.page.margins.bottom = 0;
                doc.font("Helvetica").fontSize(14);
                doc.text(
                    'Pág. ' + pageNumber,
                    0.5 * (doc.page.width - 100),
                    doc.page.height - 50,
                    {
                        width: 100,
                        align: 'center',
                        lineBreak: false,
                    })
                doc.page.margins.bottom = bottom;
            })

            doc.addPage()
            doc.image(join(process.cwd(), "uploads/GVlogo.png"), doc.page.width / 2 - 100, 150, { width: 400, })
            doc.text('', 0, 400)
            doc.font("Helvetica-Bold").fontSize(24);
            doc.text("DEV Latino", {
                width: doc.page.width,
                align: 'center'
            });
            doc.moveDown();


            doc.addPage();
            doc.text('', 50, 70);
            doc.font("Helvetica-Bold").fontSize(20);
            doc.text("PDF Generado en nuestro servidor");
            doc.moveDown();
            doc.font("Helvetica").fontSize(16);
            doc.text("Esto es un ejemplo de como generar un pdf en nuestro servidor nestjs");


            doc.addPage();
            doc.text('', 50, 70)
            doc.fontSize(24);
            doc.moveDown();
            doc.font("Helvetica").fontSize(20);
            doc.text("Capitulo 2", {
                width: doc.page.width - 100,
                align: 'center'
            });

            const table = {
                title: "Tabla ejemplo",
                subtitle: "Esta es una tabla de ejemplo",
                headers: ["id", "nombre"],
                rows: [["1", "Dev latino"], ["2", "Programadores fumados"]]
            };

            doc.table(table, {
                columnsSize: [150, 350],
            });


            const buffer = []
            doc.on('data', buffer.push.bind(buffer))
            doc.on('end', () => {
                const data = Buffer.concat(buffer)
                resolve(data)
            })
            doc.end()


        })

        return pdfBuffer;

    }

    async generatePDF(servicio: ServicioDto): Promise<Buffer> {
        const pdfBuffer: Buffer = await new Promise((resolve, reject) => {
            try {
                const doc = new PDFDocument({
                    size: 'LETTER',
                    bufferPages: true,
                    autoFirstPage: false,
                });

                // Helper function to add table
                const addTable = (doc, table, x, y, columnsSize) => {
                    doc.x = x;
                    doc.y = y;
                    doc.table(table, { columnsSize,
                        headerColor: 'white', // Set header background color to white

                     });
                };

                // Encabezado
                doc.addPage();
                doc.image(join(process.cwd(), 'uploads/GVlogo.png'), 75, 70, { width: 100 });

                // Texto en negritas, color azul y tamaño 16 para el texto del lado derecho
                doc.font('Helvetica-Bold').fontSize(16).fillColor('blue');
                const headerRightText = 'SERVICIO DE ARRASTRE Y MANIOBRA 24/7';
                const headerRightTextWidth = doc.widthOfString(headerRightText);
                doc.text(headerRightText, doc.page.width - headerRightTextWidth - 90, 80);

                // Texto normal para el encabezado principal
                doc.font('Helvetica').fontSize(10).fillColor('black');
                doc.moveDown(5); // Espacio después de la imagen del encabezado
                doc.y = 110; // datos de la empresa pone el puntero bajo el texto

                // Datos adicionales después del encabezado
                const datosEmisor = [
                    '         Datos del Emisor',
                    '    GRUAS VESCO SA DE CV',
                    '     RFC.- GVE211022SQ7',
                ];
                datosEmisor.forEach((line) => doc.text(line, { bulletRadius: 2, bulletIndent: 10 }));
                // Texto más pequeño para 'Régimen Fiscal'
                doc.fontSize(8);
                doc.text('Régimen Fiscal.- 601- General de Ley Personas Morales', { bulletRadius: 2, bulletIndent: 10 });
                doc.fontSize(10); // Restaurar el tamaño de la fuente

                // tabla de datos fecha 
                addTable(doc, {
                    headers: ['       CARTA', 'PORTE  '],
                    rows: [
                        ['Fecha Serv:', servicio.fecha],
                        ['Folio:', servicio.folioServicio],
                    ],
                }, 430, 110, [50, 50]);

                doc.x = 60; // Regresar el puntero a la izquierda
                doc.y = 200; // ajustar el puntero en medio para poner las tablas

                addTable(doc, {
                    headers: ['', '', '   DATOS    DEL', 'CLIENTE', '', ''],
                    rows: [
                        ['Nombre', servicio.cliente?.clienteTipo?.nombreCliente ?? '', 'RFC', '', 'Cod. Postal', ''],
                        ['Uso de CFDI', 'Gastos en General'],
                    ],
                }, 60, 200, [75, 100, 70, 75, 75, 75]);

                addTable(doc, {
                    headers: ['', '', '  DATOS    DEL', 'VEHICULO', '', ''],
                    rows: [
                        ['SINISTRO', ' ', 'MARCA', servicio.vehiculo?.marca?.nombre ?? '', 'PLACAS', servicio.vehiculo?.placas ?? ''],
                        ['POLIZA', servicio.vehiculo?.poliza ?? '', 'MODELO', servicio.vehiculo?.modelo?.nombre ?? '', 'COLOR', servicio.vehiculo?.color ?? ''],
                        ['SERIE', servicio.vehiculo?.serie ?? '', 'AÑO', servicio.vehiculo?.ano ?? ''],
                    ],
                }, 60, doc.y, [75, 100, 70, 75, 75, 75]);

                addTable(doc, {
                    headers: ['', '', '  DATOS    DEL', 'OPERADOR', 'No. OPR', servicio.operador.id ? servicio.operador.id : 'Sin nombre'],
                    rows: [
                        ['TIPO', 'OPERADOR ', 'NOMBRE', servicio.operador.nombre ? servicio.operador.nombre : 'Sin nombre', servicio.operador.apellidoPaterno ? servicio.operador.apellidoPaterno : 'sin nombre', servicio.operador.apellidoMaterno ? servicio.operador.apellidoMaterno : 'sin nombre'],
                        ['RFC', servicio.operador.rfc ? servicio.operador.rfc : 'Sin nombre', 'LICENCIA', servicio.operador.licencia ? servicio.operador.licencia : 'Sin nombre', 'RESIDENCIA', 'OAXACA'],
                    ],
                }, 60, doc.y, [75, 100, 70, 75, 75, 75]);

                addTable(doc, {
                    headers: ['', '', '  DATOS DE   LA ', 'GRÚA', 'NO. ECO', servicio.grua.noEco ? servicio.grua.noEco : 'Sin nombre'],
                    rows: [
                        ['NO. PERMISO', servicio.grua.noPermiso ? servicio.grua.noPermiso : 'Sin nombre', '', '    TIPO DE', 'TRANSPORTE', 'CAMION UNITARIO'],
                        ['ASEGURADORA', servicio.grua.aseguradora ? servicio.grua.aseguradora : 'Sin nombre', 'POLIZA', servicio.grua.noPoliza ? servicio.grua.noPoliza : 'Sin nombre', 'PLACAS', servicio.grua.placa ? servicio.grua.placa : 'Sin nombre'],
                    ],
                }, 60, doc.y, [65, 115, 65, 75, 75, 75]);


                addTable(doc, {
                    headers: ['UNIDAD', 'U/M', 'SERVICIO'],
                    rows: [
                        ['XVN', '1',  `SERVICIO DE TRANSLADO - UNIDAD ${servicio.vehiculo?.marca?.nombre ?? ''} ${servicio.vehiculo?.modelo?.nombre ?? ''} PLACAS ${servicio.vehiculo?.placas ?? 'SIN PLACAS'} AÑO ${servicio.vehiculo?.ano ?? ''} No Serie ${servicio.vehiculo?.serie ?? 'NO VISIBLE'}`],
                    ],
                }, 60, doc.y +20, [50, 50, 370]);


                doc.x = 160; // Regresar el puntero a la izquierda
                doc.y +20;

                const contacto = servicio.ubicacionContacto ?? '';
                const termino = servicio.ubicacionTermino ?? '';

                doc.font('Helvetica-Bold').text('CONTACTO');
                doc.font('Helvetica').fontSize(9).fillColor('black');

                doc.text(contacto);  
                doc.font('Helvetica-Bold').text('TERMINO');
                doc.font('Helvetica').fontSize(9).fillColor('black');

 
                doc.text(termino);     

                //numero de telefono
                doc.font('Helvetica-Bold').fontSize(16).fillColor('blue');
                const numeroTelefonico = '951 474 72 95';
                doc.text(numeroTelefonico, 50, 670, {
                    width: doc.page.width - 100,
                    align: 'center',
                });

                doc.font('Helvetica').fontSize(10).fillColor('black');

                // Pie de Página (Footer)
                const footerText = 'Calle Olivos #233 Ex-Hacienda Candiani Santa Cruz Xoxocotlan Oaxaca';
                const footerHeight = doc.heightOfString(footerText);
                const footerY = doc.page.height - footerHeight - 80; // Posición Y del footer
                doc.text(footerText, 50, footerY, {
                    width: doc.page.width - 100,
                    align: 'center',
                });

                const buffer = [];
                doc.on('data', buffer.push.bind(buffer));
                doc.on('end', () => {
                    const finalData = Buffer.concat(buffer);
                    resolve(finalData);
                });
                doc.end();
            } catch (error) {
                reject(error);
            }
        });

        return pdfBuffer;
    }








}
