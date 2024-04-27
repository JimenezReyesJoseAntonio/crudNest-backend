import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ServicioService } from './servicio.service';
import { ServicioDto } from './dto/servicio.dto';

@Controller('servicio')
export class ServicioController {
    constructor(
        private readonly servicioService: ServicioService
    ){}

    //@RolDecorator([RolNombre.ADMIN,RolNombre.USER])
    //@UseGuards(JwtAuthGuard, RolesGuard)
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
    async create(@Body() dto: ServicioDto) {
        console.log('de dto'+dto);
        return await this.servicioService.create(dto);
    }
    
   // @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: ServicioDto) {
        return await this.servicioService.update(id, dto);
    }


    //@UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return await this.servicioService.delete(id)
    }

}
