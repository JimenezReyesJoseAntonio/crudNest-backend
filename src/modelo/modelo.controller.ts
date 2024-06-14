import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ModeloService } from './modelo.service';
import { ModeloDto } from './dto/modelo.dto';

@Controller('modelo')
export class ModeloController {
    constructor(
        private readonly modeloService: ModeloService
    ) { }

    @Get()
    async getAll() {

        return await this.modeloService.getAll();
    }

    @Post()
    async createModelo(@Body() dto: ModeloDto) {
        return this.modeloService.create(dto);
    }

    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: ModeloDto) {
        return await this.modeloService.update(id, dto);
    }


    //@UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.modeloService.delete(id)
    }

}
