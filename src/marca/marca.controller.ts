import { Controller, Get } from '@nestjs/common';
import { MarcaService } from './marca.service';

@Controller('marca')
export class MarcaController {
    constructor(
        private readonly marcaService: MarcaService
    ){}

    @Get()
    async getAll() {
        
        return await this.marcaService.getAll();
    }
}
