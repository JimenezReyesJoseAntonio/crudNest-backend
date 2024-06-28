import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GruaEntity } from './grua.entity';
import { GruaRepository } from './grua.repository';
import { GruaDto } from './dto/grua.dto';

@Injectable()
export class GruaService {
    constructor(
        @InjectRepository(GruaEntity)
        private gruaRepository: GruaRepository
    ){}

    async getAll(): Promise<GruaEntity[]> {
        const list = await this.gruaRepository.find();
        if (!list.length) {
            throw new NotFoundException({message: 'La lista gruas esta vacia en estos momentos'});
        }
        return list;
    }

    async findById(id: number): Promise<GruaEntity | null> {
        const grua = await this.gruaRepository.findOne({ where: { noEco: id } });
        if (!grua) {
            throw new NotFoundException({message: 'no existe'});
        }
        return grua;
    }


    async create(dto: GruaDto): Promise<any> {
           // Verificar si el operador ya existe por RFC, número de teléfono o NSS
    const exists = await this.gruaRepository.findOne({
        where: [
            { placa: dto.placa },
            { serie: dto.serie },
            { noPermiso: dto.noPermiso},
            { noPoliza: dto.noPoliza }
        ]
    });

    if (exists) {
        let mensaje = 'La grua con ';
        if (exists.placa === dto.placa) {
          mensaje += ` Placa: ${dto.placa}`;
        }
        if (exists.serie === dto.serie) {
          mensaje += ` Serie: ${dto.serie}`;
        }
        if (exists.noPermiso === dto.noPermiso) {
          mensaje += ` No Permiso: ${dto.noPermiso}`;
        }
        if (exists.noPoliza === dto.noPoliza) {
          mensaje += ` No Poliza: ${dto.noPoliza}`;
        }
        throw new ConflictException({ message: mensaje + ' ya existe' });
    }

        try {
            const grua = this.gruaRepository.create(dto);
            console.log(grua.noEco);
            await this.gruaRepository.save(grua);
            return grua.noEco;
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') { // Este código de error es específico de MySQL
                throw new ConflictException({message: 'Datos duplicados con otra grua, grua no creada'});
            } else {
                // Maneja otros errores aquí
                throw error;
            }
        }
    }

        
    async update(id: number, dto: GruaDto): Promise<any> {
        try {
            const grua = await this.findById(id);
            if (!grua) {
                throw new NotFoundException({ message: 'No se encontró la grua' });
            }

            // Verificar si algún dato del DTO está duplicado con otro operador
      const duplicados = await this.gruaRepository.findOne({
        where: [
            { placa: dto.placa },
            { serie: dto.serie },
            { noPermiso: dto.noPermiso},
            { noPoliza: dto.noPoliza }
        ],
      });

      if (duplicados && duplicados.noEco !== grua.noEco) {
        let mensaje = 'La grua con ';
        if (duplicados.placa === dto.placa) {
          mensaje += ` Placa: ${dto.placa}`;
        }
        if (duplicados.serie === dto.serie) {
          mensaje += ` Serie: ${dto.serie}`;
        }
        if (duplicados.noPermiso === dto.noPermiso) {
          mensaje += ` No Permiso: ${dto.noPermiso}`;
        }
        if (duplicados.noPoliza === dto.noPoliza) {
          mensaje += ` No Poliza: ${dto.noPoliza}`;
        }
        throw new ConflictException({ message: mensaje + ' ya existe' });
      }
    
            grua.placa = dto.placa ?? grua.placa;
            grua.serie = dto.serie ?? grua.serie;
            grua.noPermiso = dto.noPermiso ?? grua.noPermiso;
            grua.aseguradora = dto.aseguradora ?? grua.aseguradora;
            grua.noPoliza = dto.noPoliza ?? grua.noPoliza;
            grua.ano = dto.ano ?? grua.ano;
            grua.kilometraje = dto.kilometraje ?? grua.kilometraje;

            
            await this.gruaRepository.save(grua);
            
            return { message: 'Datos de la grua actualizados' };
        } catch (error) {
            // Manejar errores específicos
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException({ message: 'Datos duplicados con otra grua, grua no actualizada' });
            } else {
                throw error; // Relanzar otros errores
            }
        }
    }


    async delete(id: number): Promise<any> {
        const grua = await this.findById(id);
        if (!grua) {
            throw new NotFoundException({ message: 'No se encontró la grua' });
        }
    
        grua.eliminado = 1; // Marcar como eliminada
        await this.gruaRepository.save(grua);
    
        return { message: 'Grua eliminada' };
    }

    //actualiza el estado del servicio
  async updateKm(id: number, fieldName: string, newValue: any): Promise<any> {
    try {
        const servicio = await this.findById(id);
        if (!servicio) {
            throw new NotFoundException({ message: 'No se encontró la grua' });
        }

        // Verificar que el campo a actualizar existe en el modelo de Servicio
        if (!(fieldName in servicio)) {
            throw new BadRequestException({ message: 'Campo a actualizar no válido' });
        }

        servicio[fieldName] = newValue;

        await this.gruaRepository.save(servicio);

        return { message: 'Dato de la grua actualizado' };
    } catch (error) {
        // Manejar errores específicos
        if (error.code === 'ER_DUP_ENTRY') {
            throw new ConflictException({ message: error.message });
        } else {
            throw error; // Relanzar otros errores
        }
    }
}


}
