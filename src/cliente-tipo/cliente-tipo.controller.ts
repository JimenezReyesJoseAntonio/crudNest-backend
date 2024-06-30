import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ClienteTipoService } from './cliente-tipo.service';
import { ClienteTipoDto } from './dto/cliente-tipo.dto';

@Controller('api/cliente-tipo')
export class ClienteTipoController {

    constructor(
        private readonly clienteTipoService: ClienteTipoService
    ){}


    //@RolDecorator([RolNombre.ADMIN,RolNombre.USER])
    //@UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async getAll() {
        
        return await this.clienteTipoService.getAll();
    }

   // @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.clienteTipoService.findById(id);
    }

    //@UseGuards(JwtAuthGuard, RolesGuard) 
    @Post()
    async create(@Body() dto: ClienteTipoDto) {
        console.log('de dto'+dto);
        return await this.clienteTipoService.create(dto);
    }
    
   // @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: ClienteTipoDto) {
        return await this.clienteTipoService.update(id, dto);
    }


    //@UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return await this.clienteTipoService.delete(id)
    }
}
