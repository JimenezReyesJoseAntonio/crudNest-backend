import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstatusOperadorEntity } from './estatus-operador.entity';
import { OperadorEntity } from 'src/operador/operador.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstatusOperadorService {
    constructor(
        @InjectRepository(EstatusOperadorEntity)
        private readonly estatusOperadorRepository: Repository<EstatusOperadorEntity>,
        @InjectRepository(OperadorEntity)
        private readonly operadorRepository: Repository<OperadorEntity>,
      ) {}

      async asignarEstatusOperador(idOperador: number, nombreEstatus: string): Promise<void> {
        const operador = await this.operadorRepository.findOne({ where: { id: idOperador }});
        if (!operador) {
          throw new Error(`Operador con ID ${idOperador} no encontrado.`);
        }
    
        const estatusOperador = await this.estatusOperadorRepository.findOne({ where: { operador } });
        if (estatusOperador) {
          // Si ya existe un registro de estado para este operador, actualiza el estado
          estatusOperador.nombreEstatus = nombreEstatus;
          await this.estatusOperadorRepository.save(estatusOperador);
        } else {
          // Si no existe, crea un nuevo registro de estado para este operador
          const nuevoEstatusOperador = this.estatusOperadorRepository.create({
            operador,
            nombreEstatus,
          });
          await this.estatusOperadorRepository.save(nuevoEstatusOperador);
        }
      }

      //mandar un solo dato debemos usar el siguiente formato json para que angular no tenga problema
      async obtenerEstatusOperador(idOperador: number): Promise<{ nombreEstatus: string } | null> {
        const operador = await this.operadorRepository.findOne({ where: { id: idOperador }});
        if (!operador) {
          throw new Error(`Operador con ID ${idOperador} no encontrado.`);
        }
      
        const estatusOperador = await this.estatusOperadorRepository.findOne({ where: { operador } });
        return estatusOperador ? { nombreEstatus: estatusOperador.nombreEstatus } : null;
      }
      
      async getAll(): Promise<EstatusOperadorEntity[]> {
        const list = await this.estatusOperadorRepository.find({
          relations: ['operador'], // Esto asegura que se incluya la relación con el operador
        });
        if (!list.length) {
          throw new NotFoundException({ message: 'la lista está vacía' });
        }
        return list;
      }
}
