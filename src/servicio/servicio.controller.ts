import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ServicioService } from './servicio.service';
import { ServicioDto } from './dto/servicio.dto';
import { EntityManager } from 'typeorm';
import * as moment from 'moment';

@Controller('servicio')
export class ServicioController {
    constructor(
        private readonly servicioService: ServicioService
    ){}

    @Get('cantidad-total')
    async getCantidadTotalServicios(): Promise<number> {
      return this.servicioService.getCantidadTotalServicios();
    }

    @Get('por-cliente-tipo')
    async getServiciosPorClienteTipo() {
        try {
            const resultados = await this.servicioService.getServiciosPorClienteTipo();
            return { success: true, data: resultados }; // Aquí se espera la respuesta
        } catch (error) {
            return { success: false, message: 'Error al obtener servicios por cliente tipo' };
        }
    }

    //@RolDecorator([RolNombre.ADMIN,RolNombre.USER])
    //@UseGuards(JwtAuthGuard, RolesGuard)
    @Get('folio/:folio')
    async getByFolio(@Param('folio') folio: string) {
        return await this.servicioService.findByFolio(folio);
    }
    
    @Get()
    async getAll() {
        
        return await this.servicioService.getAll();
    }

   // @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.servicioService.findById(id);
    }

   

    //@UseGuards(JwtAuthGuard, RolesGuard) 
    @Post()
    async create(@Body() dto: ServicioDto,manager: EntityManager) {
      // Convertir la fecha a un objeto Date
  
        console.log('de dto'+dto);
        return await this.servicioService.create(dto,manager);
    }
    
   // @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: ServicioDto) {
        return await this.servicioService.update(id, dto);
    }
    //metodo para cambiar el estatus del servicio
    @Put(':id/:campo')
    async actualizarDato(
      @Param('id') id: number,
      @Param('campo') campo: string,
      @Body() body: { valor: any },
    ): Promise<any> {
      const { valor } = body;
  
      try {
        const mensaje = await this.servicioService.updateEstado(id, campo, valor);
        return { message: mensaje };
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new NotFoundException({ message: error.message });
        } else {
          throw error;
        }
      }
    }
  
     //metodo para cambiar el km de termino del servicio
     @Put('updatekm/:id/:campo')
     async actualizarkm(
       @Param('id') id: number,
       @Param('campo') campo: string,
       @Body() body: { valor: any },
     ): Promise<any> {
       const { valor } = body;
   
       try {
         const mensaje = await this.servicioService.updateKmTermino(id, campo, valor);
         return { message: mensaje };
       } catch (error) {
         if (error instanceof NotFoundException) {
           throw new NotFoundException({ message: error.message });
         } else {
           throw error;
         }
       }
     }


    //@UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return await this.servicioService.delete(id)
    }

   




}
