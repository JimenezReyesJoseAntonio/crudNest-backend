import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { VehiculoDto } from './dto/vehiculo.dto';
import { EntityManager } from 'typeorm';

@Controller('vehiculo')
export class VehiculoController {
    constructor(
        private readonly vehiculoService: VehiculoService
    ){}

    //@RolDecorator([RolNombre.ADMIN,RolNombre.USER])
    //@UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async getAll() {
        
        return await this.vehiculoService.getAll();
    }

   // @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.vehiculoService.findById(id);
    }

    //@UseGuards(JwtAuthGuard, RolesGuard) 
    @Post()
    async create(@Body() dto: VehiculoDto,manager: EntityManager) {
        console.log('de dto'+dto);
        return await this.vehiculoService.create(dto,manager);
    }
    
   // @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: VehiculoDto) {
        return await this.vehiculoService.update(id, dto);
    }


    //@UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return await this.vehiculoService.delete(id)
    }


}
