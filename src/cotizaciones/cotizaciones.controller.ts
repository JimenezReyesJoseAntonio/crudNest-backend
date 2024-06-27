import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CotizacionesService } from './cotizaciones.service';
import { CotizacionDto } from './dto/cotizaciones.dto';

@Controller('cotizaciones')
export class CotizacionesController {
    constructor(
        private readonly cotizacionService: CotizacionesService
    ){}

    
    @Get()
    async getAll() {
        
        return await this.cotizacionService.getAll();
    }

   // @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.cotizacionService.findById(id);
    }

    //@UseGuards(JwtAuthGuard, RolesGuard) 
    @Post()
    async create(@Body() dto: CotizacionDto) {  
        console.log('de dto'+dto);
        return await this.cotizacionService.create(dto);
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
        const mensaje = await this.cotizacionService.updateEstado(id, campo, valor);
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
        return await this.cotizacionService.delete(id)
    }

   

}
