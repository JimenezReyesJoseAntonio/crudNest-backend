import { Controller, Get } from '@nestjs/common';
import { GruaEstatusService } from './grua-estatus.service';

@Controller('api/grua-estatus')
export class GruaEstatusController {

    constructor(
        private readonly estatusService:GruaEstatusService
    ){}

    //@RolDecorator([RolNombre.ADMIN,RolNombre.USER])
    //@UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async getAll() {
        
        return await this.estatusService.getAll();
    }
}
