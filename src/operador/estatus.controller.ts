import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { EstatusService } from './estatus.service';

@Controller('api/estatusOperador')
export class EstatusController {

    constructor(
        private readonly estatusService:EstatusService
    ){}

    //@RolDecorator([RolNombre.ADMIN,RolNombre.USER])
    //@UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async getAll() {
        
        return await this.estatusService.getAll();
    }

  
}
