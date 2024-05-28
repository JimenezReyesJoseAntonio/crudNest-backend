import { Body, Controller, Get, Post } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { MarcaDto } from './dto/marca.dto';

@Controller('marca')
export class MarcaController {
    constructor(
        private readonly marcaService: MarcaService
    ){}

    @Get()
    async getAll() {
        
        return await this.marcaService.getAll();
    }

    @Post()
    async createMarca(
      @Body() dto: MarcaDto,
    ) {
      return this.marcaService.create(dto);
    }
}
