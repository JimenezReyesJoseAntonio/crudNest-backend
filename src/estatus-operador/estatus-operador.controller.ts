import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { EstatusOperadorService } from './estatus-operador.service';

@Controller('estatus-operador')
export class EstatusOperadorController {
    constructor(private readonly estatusOperadorService: EstatusOperadorService) {}

    @Post(':idOperador')
    async asignarEstatusOperador(
      @Param('idOperador', ParseIntPipe) idOperador: number,
      @Body() body: { estado: string }
    ): Promise<void> {
      const { estado } = body;
      await this.estatusOperadorService.asignarEstatusOperador(idOperador, estado);
    }
  
    @Get(':idOperador')
    async obtenerEstatusOperador(@Param('idOperador', ParseIntPipe) idOperador: number): Promise<string | null> {
      return this.estatusOperadorService.obtenerEstatusOperador(idOperador);
    }

    @Get()
    async getAll() {
        
        return await this.estatusOperadorService.getAll();
    }

}
