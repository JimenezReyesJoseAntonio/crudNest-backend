import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { OperadorEntity } from './operador.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OperadorRepository } from './operador.repository';
import { OperadorDto } from './dto/operador.dto';

@Injectable()
export class OperadorService {
    constructor(
        @InjectRepository(OperadorEntity)
        private operadorRepository: OperadorRepository
    ){}

    async getAll(): Promise<OperadorEntity[]> {
        const list = await this.operadorRepository.find();
        if (!list.length) {
            throw new NotFoundException({message: 'la lista esta vacia'});
        }
        return list;
    }

    async findById(id: number): Promise<OperadorEntity | null> {
        const operador = await this.operadorRepository.findOne({ where: { id: id } });
        if (!operador) {
            throw new NotFoundException({message: 'no existe'});
        }
        return operador;
    }

    async findByNombre(nombre: string): Promise<OperadorEntity> {
        const operador = await this.operadorRepository.findOne({where:{nombre: nombre} });
        return operador;
    }

    async create(dto: OperadorDto): Promise<any> {
        try {
            const operador = this.operadorRepository.create(dto);
            console.log(operador.nombre);
            await this.operadorRepository.save(operador);
            return {message: 'operador registrado'};
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') { // Este código de error es específico de MySQL
                throw new ConflictException({message: 'Datos duplicados con otro operador, operador no creado'});
            } else {
                // Maneja otros errores aquí
                throw error;
            }
        }
    }

        
    async update(id: number, dto: OperadorDto): Promise<any> {
        try {
            const operador = await this.findById(id);
            if (!operador) {
                throw new NotFoundException({ message: 'No se encontró el operador' });
            }
    
            operador.nombre = dto.nombre ?? operador.nombre;
            operador.apellidoPaterno = dto.apellidoPaterno ?? operador.apellidoPaterno;
            operador.apellidoMaterno = dto.apellidoMaterno ?? operador.apellidoMaterno;
            operador.numTelefono = dto.numTelefono ?? operador.numTelefono;
            operador.rfc = dto.rfc ?? operador.rfc;
            operador.curp = dto.curp ?? operador.curp;
            operador.nss = dto.nss ?? operador.nss;
            operador.direccion = dto.direccion ?? operador.direccion;
            operador.codigoPostal = dto.codigoPostal ?? operador.codigoPostal;
            operador.puesto = dto.puesto ?? operador.puesto;
            operador.licencia = dto.licencia ?? operador.licencia;
            operador.residencia = dto.residencia ?? operador.residencia;
            operador.estatus = dto.estatus ?? operador.estatus;
            
            await this.operadorRepository.save(operador);
            
            return { message: 'Datos del operador actualizados' };
        } catch (error) {
            // Manejar errores específicos
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException({ message: 'Datos duplicados con otro operador, operador no actualizado' });
            } else {
                throw error; // Relanzar otros errores
            }
        }
    }


    async delete(id: number): Promise<any> {
        const operador = await this.findById(id);
        await this.operadorRepository.delete(operador);
        return {message: 'operador eliminado'};

    }



}
