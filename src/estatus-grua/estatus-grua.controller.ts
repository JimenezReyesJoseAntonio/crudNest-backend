import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { EstatusGruaService } from './estatus-grua.service';

@Controller('estatus-grua')
export class EstatusGruaController {
    constructor(private readonly estatusGruaService: EstatusGruaService) {}

    @Post(':idGrua')
    async asignarEstatusOperador(
      @Param('idGrua', ParseIntPipe) idGrua: number,
      @Body() body: { estado: string }
    ): Promise<void> {
      const { estado } = body;
      await this.estatusGruaService.asignarEstatusGrua(idGrua, estado);
    }
  
    //mandar un solo dato debemos usar el siguiente formato json para que angular no tenga problema
    @Get(':idGrua')
    async obtenerEstatusOperador(@Param('idGrua', ParseIntPipe) idGrua: number): Promise<{ nombreEstatus: string } | null> {
      return this.estatusGruaService.obtenerEstatusOperador(idGrua);
    }

    @Get()
    async getAll() {
        
        return await this.estatusGruaService.getAll();
    }


}
