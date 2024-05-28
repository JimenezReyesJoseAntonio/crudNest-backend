import { Body, Controller, Get, Post } from '@nestjs/common';
import { ModeloService } from './modelo.service';
import { ModeloDto } from './dto/modelo.dto';

@Controller('modelo')
export class ModeloController {
    constructor(
        private readonly modeloService: ModeloService
    ){}

    @Get()
    async getAll() {
        
        return await this.modeloService.getAll();
    }

    @Post()
    async createModelo(@Body() dto: ModeloDto) {
      return this.modeloService.create(dto);
    }

    
}
