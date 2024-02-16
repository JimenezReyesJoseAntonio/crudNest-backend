import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoEntity } from './producto.entity';
import { ProductoRepository } from './producto.repository';
import { ProductoDto } from './dto/producto.dto';

@Injectable()
export class ProductoService {
    constructor(
        @InjectRepository(ProductoEntity)
        private productoRepository: ProductoRepository
    ) { }

    async getAll(): Promise<ProductoEntity[]> {
        const list = await this.productoRepository.find();
        if (!list.length) {
            throw new NotFoundException({message: 'la lista esta viacia'});
        }
        return list;
    }

    async findById(id: number): Promise<ProductoEntity | null> {
        const producto = await this.productoRepository.findOne({ where: { id: id } });
        if (!producto) {
            throw new NotFoundException({message: 'no existe'});
        }
        return producto;
    }

    async findByNombre(nombre: string): Promise<ProductoEntity> {
        const producto = await this.productoRepository.findOne({where:{nombre: nombre} });
        return producto;
    }

    async create(dto: ProductoDto): Promise<any> {
        const exists = await this.findByNombre(dto.nombre);
        if (exists) throw new BadRequestException({message: 'ese nombre ya existe'});
        const producto = this.productoRepository.create(dto);
        await this.productoRepository.save(producto);
        return {message: 'producto creado'};
        }

    async update(id: number, dto: ProductoDto): Promise<any> {
        const producto = await this.findById(id);
        if (!producto)
            throw new NotFoundException({message: 'no existe'});
        const exists = await this.findByNombre(dto.nombre);
        if (exists && exists.id !== id) throw new BadRequestException({message: 'ese producto ya existe'});
        dto.nombre ? producto.nombre = dto.nombre : producto.nombre = producto.nombre;
        dto.precio ? producto.precio = dto.precio : producto.precio = producto.precio;
        await this.productoRepository.save(producto);
        return {message: 'producto actualizado'};
    }

    async delete(id: number): Promise<any> {
        const producto = await this.findById(id);
        await this.productoRepository.delete(producto);
        return {message: 'producto eliminado'};

    }


}
