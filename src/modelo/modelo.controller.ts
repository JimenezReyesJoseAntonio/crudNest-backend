import { Controller, Get } from '@nestjs/common';
import { ModeloService } from './modelo.service';

@Controller('modelo')
export class ModeloController {
    constructor(
        private readonly modeloService: ModeloService
    ){}

    @Get()
    async getAll() {
        
        return await this.modeloService.getAll();
    }
}
