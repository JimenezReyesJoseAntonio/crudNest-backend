import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OperadorEntity } from './operador.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OperadorRepository } from './operador.repository';
import { OperadorDto } from './dto/operador.dto';

@Injectable()
export class OperadorService {
  constructor(
    @InjectRepository(OperadorEntity)
    private operadorRepository: OperadorRepository,
  ) {}

  async getAll(): Promise<OperadorEntity[]> {
    const list = await this.operadorRepository.find({
      relations: ['estatusOperador']
    });
  
    if (!list.length) {
      throw new NotFoundException({
        message: 'La lista de operadores esta vacia en estos momentos',
      });
    }
    return list;
  }

  async findById(id: number): Promise<OperadorEntity | null> {
    const operador = await this.operadorRepository.findOne({
      where: { id: id },
    });
    if (!operador) {
      throw new NotFoundException({ message: 'no existe' });
    }
    return operador;
  }

  async findByNombre(nombre: string): Promise<OperadorEntity> {
    const operador = await this.operadorRepository.findOne({
      where: { nombre: nombre },
    });
    return operador;
  }

  async create(dto: OperadorDto): Promise<any> {
    // Verificar si el operador ya existe por RFC, número de teléfono o NSS
    const exists = await this.operadorRepository.findOne({
      where: [
        { numTelefono: dto.numTelefono },
        { rfc: dto.rfc },
        { curp: dto.curp },
        { nss: dto.nss },
        { licencia: dto.licencia },
      ],
    });

    if (exists) {
        let mensaje = 'El operador con ';
        if (exists.numTelefono === dto.numTelefono) {
          mensaje += ` Número de teléfono: ${dto.numTelefono}`;
        }
        if (exists.rfc === dto.rfc) {
          mensaje += ` RFC: ${dto.rfc}`;
        }
        if (exists.curp === dto.curp) {
          mensaje += ` CURP: ${dto.curp}`;
        }
        if (exists.nss === dto.nss) {
          mensaje += ` NSS: ${dto.nss}`;
        }
        if (exists.licencia === dto.licencia) {
          mensaje += ` Licencia: ${dto.licencia}`;
        }
        throw new ConflictException({ message: mensaje + ' ya existe' });
    }
    const connection = this.operadorRepository.manager.connection;
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const operador = this.operadorRepository.create(dto);
      await queryRunner.manager.save(operador); // Guarda el operador en la transacción
      await queryRunner.commitTransaction(); // Confirma la transacción
      return operador.id;
    } catch (error) {
      await queryRunner.rollbackTransaction(); // Deshace la transacción si hay un error
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException({
          message: 'Datos duplicados con otro operador, operador no creado',
        });
      } else {
        throw error;
      }
    } finally {
      await queryRunner.release(); // Libera el queryRunner
    }
  }

  async update(id: number, dto: OperadorDto): Promise<any> {
    try {
      const operador = await this.findById(id);
      if (!operador) {
        throw new NotFoundException({ message: 'No se encontró el operador' });
      }

      // Verificar si algún dato del DTO está duplicado con otro operador
      const duplicados = await this.operadorRepository.findOne({
        where: [
          { numTelefono: dto.numTelefono },
          { rfc: dto.rfc },
          { curp: dto.curp },
          { nss: dto.nss },
          { licencia: dto.licencia },
        ],
      });

      if (duplicados && duplicados.id !== operador.id) {
        // Encontrado un operador con datos duplicados
        // Encontrado un operador con datos duplicados
        let mensaje = 'El operador con ';
        if (duplicados.numTelefono === dto.numTelefono) {
          mensaje += ` Número de teléfono: ${dto.numTelefono}`;
        }
        if (duplicados.rfc === dto.rfc) {
          mensaje += ` RFC: ${dto.rfc}`;
        }
        if (duplicados.curp === dto.curp) {
          mensaje += ` CURP: ${dto.curp}`;
        }
        if (duplicados.nss === dto.nss) {
          mensaje += ` NSS: ${dto.nss}`;
        }
        if (duplicados.licencia === dto.licencia) {
          mensaje += ` Licencia: ${dto.licencia}`;
        }
        throw new ConflictException({ message: mensaje + ' ya existe' });
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
      operador.licencia = dto.licencia ?? operador.licencia;

      await this.operadorRepository.save(operador);

      return { message: 'Datos del operador actualizados' };
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
    const operador = await this.findById(id);
    if (!operador) {
        throw new NotFoundException({ message: 'No se encontró el operador' });
    }

    operador.eliminado = 1; // Marcar como eliminada
    await this.operadorRepository.save(operador);

    return { message: 'Operador eliminado' };
}

}
