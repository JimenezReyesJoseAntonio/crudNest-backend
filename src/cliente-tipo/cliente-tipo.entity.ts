import { ClienteEntity } from "src/cliente/cliente.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'clientetipo'})
export class ClienteTipoEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar',length: 20, nullable: false,unique:true})
    nombreCliente: string;

    @Column({type: 'int', nullable: false})
    eliminado: number;


}