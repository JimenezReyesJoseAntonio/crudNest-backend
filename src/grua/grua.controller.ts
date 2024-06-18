import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
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


    //@UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return await this.gruaService.delete(id)
    }
}

