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
        // Determinar cuál campo está duplicado y lanzar la excepción correspondiente
        if (exists.placa === dto.placa) {
            throw new BadRequestException({ message: 'La grúa con esta placa ya existe' });
        } else if (exists.serie === dto.serie) {
            throw new BadRequestException({ message: 'La grúa con este número de serie ya existe' });
        } else if (exists.noPermiso === dto.noPermiso) {
            throw new BadRequestException({ message: 'La grúa con este No Permiso ya existe' });
        } else if (exists.noPoliza === dto.noPoliza){
            throw new BadRequestException({ message: 'La grúa con este No Poliza ya existe' });
        } 
    }

        try {
            const grua = this.gruaRepository.create(dto);
            console.log(grua.noEco);
            await this.gruaRepository.save(grua);
            return {message: 'Grua registrada'};
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
    
            grua.placa = dto.placa ?? grua.placa;
            grua.serie = dto.serie ?? grua.serie;
            grua.noPermiso = dto.noPermiso ?? grua.noPermiso;
            grua.aseguradora = dto.aseguradora ?? grua.aseguradora;
            grua.noPoliza = dto.noPoliza ?? grua.noPoliza;
            grua.ano = dto.ano ?? grua.ano;
            grua.kilometraje = dto.kilometraje ?? grua.kilometraje;
            grua.estatus = dto.estatus ?? grua.estatus;

            //operador.estatus = dto.estatus ?? operador.estatus;
            
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
        await this.gruaRepository.delete(grua);
        return {message: 'grua eliminado'};

    }



}
