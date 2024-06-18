import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { MarcaDto } from './dto/marca.dto';

@Controller('api/marca')
export class MarcaController {
  constructor(
    private readonly marcaService: MarcaService
  ) { }

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

  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: MarcaDto) {
    return await this.marcaService.update(id, dto);
  }


  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.marcaService.delete(id)
  }
}
