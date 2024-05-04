import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstatusGruaEntity } from './estatus-grua.entity';
import { Repository } from 'typeorm';
import { GruaEntity } from 'src/grua/grua.entity';

@Injectable()
export class EstatusGruaService {

    constructor(
        @InjectRepository(EstatusGruaEntity)
        private readonly estatusGruaRepository: Repository<EstatusGruaEntity>,
        @InjectRepository(GruaEntity)
        private readonly gruaRepository: Repository<GruaEntity>,
      ) {}

      async asignarEstatusGrua(idGrua: number, nombreEstatus: string): Promise<void> {
        const grua = await this.gruaRepository.findOne({ where: { noEco: idGrua }});
        if (!grua) {
          throw new Error(`Operador con ID ${idGrua} no encontrado.`);
        }
    
        const estatusGrua = await this.estatusGruaRepository.findOne({ where: { grua } });
        if (estatusGrua) {
          // Si ya existe un registro de estado para este operador, actualiza el estado
          estatusGrua.nombreEstatus = nombreEstatus;
          await this.estatusGruaRepository.save(estatusGrua);
        } else {
          // Si no existe, crea un nuevo registro de estado para este operador
          const nuevoEstatusGrua = this.estatusGruaRepository.create({
            grua,
            nombreEstatus,
          });
          await this.estatusGruaRepository.save(nuevoEstatusGrua);
        }
      }

      //mandar un solo dato debemos usar el siguiente formato json para que angular no tenga problema
      async obtenerEstatusOperador(idGrua: number): Promise<{ nombreEstatus: string } | null> {
        const grua = await this.gruaRepository.findOne({ where: { noEco: idGrua }});
        if (!grua) {
          throw new Error(`Grua con ID ${idGrua} no encontrada.`);
        }
      
        const estatusOperador = await this.estatusGruaRepository.findOne({ where: { grua } });
        return estatusOperador ? { nombreEstatus: estatusOperador.nombreEstatus } : null;
      }
      
      async getAll(): Promise<EstatusGruaEntity[]> {
        const list = await this.estatusGruaRepository.find({
          relations: ['grua'], // Esto asegura que se incluya la relación con la grua
        });
        if (!list.length) {
          throw new NotFoundException({ message: 'la lista está vacía' });
        }
        return list;
      }
}
