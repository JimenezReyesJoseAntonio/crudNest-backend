import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { OperadorService } from './operador.service';
import { OperadorDto } from './dto/operador.dto';

@Controller('operador')
export class OperadorController {

    constructor(
        private readonly operadorService: OperadorService
    ){}

    @Get()
    async getAll() {
        
        return await this.operadorService.getAll();
    }

    
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.operadorService.findById(id);
    }

    
    @Post()
    async create(@Body() dto: OperadorDto) {
        console.log('de dto'+dto.nombre);
        return await this.operadorService.create(dto);
    }
    
    
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: OperadorDto) {
        return await this.operadorService.update(id, dto);
    }


    
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return await this.operadorService.delete(id)
    }
}
