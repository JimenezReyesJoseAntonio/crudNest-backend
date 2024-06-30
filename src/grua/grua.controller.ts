import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { GruaService } from './grua.service';
import { GruaDto } from './dto/grua.dto';

@Controller('api/grua')
export class GruaController {

    constructor(
        private readonly gruaService: GruaService
    ){}

    //@RolDecorator([RolNombre.ADMIN,RolNombre.USER])
    //@UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async getAll() {
        
        return await this.gruaService.getAll();
    }

   // @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.gruaService.findById(id);
    }

    //@UseGuards(JwtAuthGuard, RolesGuard) 
    @Post()
    async create(@Body() dto: GruaDto) {
        console.log('de dto'+dto);
        return await this.gruaService.create(dto);
    }
    
   // @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: GruaDto) {
        return await this.gruaService.update(id, dto);
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
        const mensaje = await this.gruaService.updateKm(id, campo, valor);
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
        return await this.gruaService.delete(id)
    }
}

