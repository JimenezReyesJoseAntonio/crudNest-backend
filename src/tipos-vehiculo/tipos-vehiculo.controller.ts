import { Controller, Get } from '@nestjs/common';
import { TiposVehiculoService } from './tipos-vehiculo.service';

@Controller('api/tipos-vehiculo')
export class TiposVehiculoController {
    constructor(
        private readonly tiposVService: TiposVehiculoService
    ){}

    @Get()
    async getAll() {
        
        return await this.tiposVService.getAll();
    }
}
