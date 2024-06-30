import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { OperadorService } from './operador.service';
import { OperadorDto } from './dto/operador.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/rol.guard';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { RolNombre } from 'src/rol/rol.enum';

@Controller('api/operador')
export class OperadorController {

    constructor(
        private readonly operadorService: OperadorService
    ){}

    //@RolDecorator([RolNombre.ADMIN,RolNombre.USER])
    //@UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async getAll() {
        
        return await this.operadorService.getAll();
    }

   // @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.operadorService.findById(id);
    }

    //@UseGuards(JwtAuthGuard, RolesGuard) 
    @Post()
    async create(@Body() dto: OperadorDto) {
        console.log('de dto'+dto.nombre);
        return await this.operadorService.create(dto);
    }
    
   // @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: OperadorDto) {
        return await this.operadorService.update(id, dto);
    }


    //@UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return await this.operadorService.delete(id)
    }
}
