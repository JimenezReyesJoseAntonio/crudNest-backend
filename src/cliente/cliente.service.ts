import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClienteEntity } from './cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteRepository } from './cliente.repository';
import { ClienteDto } from './dto/cliente.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(ClienteEntity)
    private clienteRepository: ClienteRepository,
  ) {}

  async getAll(): Promise<ClienteEntity[]> {
    const list = await this.clienteRepository.find();
    if (!list.length) {
      throw new NotFoundException({
        message: 'La lista clientes esta vacia en estos momentos',
      });
    }
    return list;
  }

  async findById(id: number): Promise<ClienteEntity | null> {
    const cliente = await this.clienteRepository.findOne({ where: { id: id } });
    if (!cliente) {
      throw new NotFoundException({ message: 'no existe' });
    }
    return cliente;
  }

  async create(dto: ClienteDto): Promise<any> {
    try {
      console.log('ClienteDto a enviar:', dto);

      const cliente = this.clienteRepository.create(dto);
      

      await this.clienteRepository.save(cliente);
      console.log('el cliente'+cliente);
      console.log('numTelefono:', cliente.numTelefono); // Accede a la propiedad numTelefono del objeto cliente
      console.log('clienteTipo:', cliente.clienteTipo); // Accede a la propiedad clienteTipo del objeto cliente
      console.log('eliminado:', cliente.eliminado); // Accede a la propiedad eliminado del objeto cliente
      console.log('nombre cliente', dto.clienteTipo.nombreCliente);

     // console.log('cliente id'+cliente.id);
      //console.log('nombre cliente'+cliente.clienteTipo.nombreCliente);
      return cliente.id; //Devuelve el cliente creado para poder crear el vehiculo
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        // Este código de error es específico de MySQL
        throw new ConflictException({ message: error.message });
      } else {
        // Maneja otros errores aquí
        throw error;
      }
    }
  }

  async update(id: number, dto: ClienteDto): Promise<any> {
    try {
      const cliente = await this.findById(id);
      if (!cliente) {
        throw new NotFoundException({ message: 'No se encontró el cliente' });
      }

      cliente.numTelefono = dto.numTelefono ?? cliente.numTelefono;
      cliente.clienteTipo = dto.clienteTipo ?? cliente.clienteTipo;

      await this.clienteRepository.save(cliente);

      return { message: 'Datos del cliente actualizados' };
    } catch (error) {
      // Manejar errores específicos
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException({ message: error.message });
      } else {
        throw error; // Relanzar otros errores
      }
    }
  }

  async delete(id: number): Promise<any> {
    const cliente = await this.findById(id);
    if (!cliente) {
      throw new NotFoundException({ message: 'No se encontró el cliente' });
    }

    cliente.eliminado = 1; // Marcar como eliminada
    await this.clienteRepository.save(cliente);

    return { message: 'cliente eliminado' };
  }
}
