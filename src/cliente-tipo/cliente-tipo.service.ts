import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ClienteTipoEntity } from './cliente-tipo.entity';
import { ClienteTipoRepository } from './cliente-tipo.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteTipoDto } from './dto/cliente-tipo.dto';

@Injectable()
export class ClienteTipoService {
    constructor(
        @InjectRepository(ClienteTipoEntity)
        private clienteTipoRepository: ClienteTipoRepository
    ) { }

    async getAll(): Promise<ClienteTipoEntity[]> {
        const list = await this.clienteTipoRepository.find();
        if (!list.length) {
            throw new NotFoundException({ message: 'La lista clientes esta vacia en estos momentos' });
        }
        return list;
    }

    async findById(id: number): Promise<ClienteTipoEntity | null> {
        const cliente = await this.clienteTipoRepository.findOne({ where: { id: id } });
        if (!cliente) {
            throw new NotFoundException({ message: 'no existe' });
        }
        return cliente;
    }

    async findByNombre(nombre: string): Promise<ClienteTipoEntity> {
        const producto = await this.clienteTipoRepository.findOne({ where: { nombreCliente: nombre } });
        return producto;
    }


    async create(dto: ClienteTipoDto): Promise<any> {
        const exists = await this.findByNombre(dto.nombreCliente);
        if (exists) throw new BadRequestException({ message: 'ese  tipo cliente ya existe' });
        try {
            const cliente = this.clienteTipoRepository.create(dto);
            console.log(cliente.id);
            console.log(cliente.nombreCliente);

            await this.clienteTipoRepository.save(cliente);
            return { message: 'Tipo cliente registrado' };
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') { // Este código de error es específico de MySQL
                throw new ConflictException({ message: error.message });
            } else {
                // Maneja otros errores aquí
                throw error;
            }
        }
    }


    async update(id: number, dto: ClienteTipoDto): Promise<any> {
        try {
            const cliente = await this.findById(id);
            if (!cliente) {
                throw new NotFoundException({ message: 'No se encontró el tipo de cliente' });
            }

            // Verificar si algún dato del DTO está duplicado con otro cliente tipo
            const duplicados = await this.clienteTipoRepository.findOne({ where: { nombreCliente: dto.nombreCliente } });

            if (duplicados && duplicados.id !== cliente.id) {
                // Encontrado un cliente tipo con datos duplicados
                let mensaje = 'El cliente con ';
                if (duplicados.nombreCliente === dto.nombreCliente) {
                    mensaje += ` Nombre cliente: ${dto.nombreCliente}`;
                }

                throw new ConflictException({ message: mensaje + ' ya existe' });
            }


            cliente.nombreCliente = dto.nombreCliente ?? cliente.nombreCliente;


            await this.clienteTipoRepository.save(cliente);

            return { message: 'Datos del tipo cliente actualizados' };
        } catch (error) {
            // Manejar errores específicos
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException({ message: 'Datos duplicados con otra tipo cliente, Tipo cliente no actualizado' });
            } else {
                throw error; // Relanzar otros errores
            }
        }
    }

    async delete(id: number): Promise<any> {
        const clienteTipo = await this.findById(id);
        if (!clienteTipo) {
            throw new NotFoundException({ message: 'No se encontró el tipo de cliente' });
        }

        clienteTipo.eliminado = 1; // Marcar como eliminada
        await this.clienteTipoRepository.save(clienteTipo);

        return { message: 'Tipo cliente eliminado' };
    }


}
