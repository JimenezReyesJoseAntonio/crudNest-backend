import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EstatusEntity } from "./estatus.entity";

@Entity({name:'operador'})
export class OperadorEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar',length: 15, nullable: false})
    nombre: string;

    @Column({type: 'varchar',length: 15, nullable: false})
    apellidoPaterno: string;

    @Column({type: 'varchar',length: 15, nullable: false})
    apellidoMaterno: string;

    @Column({type: 'varchar',length: 15, nullable: false,unique: true})
    numTelefono: string;

    @Column({type: 'varchar',length: 20, unique: true})
    rfc:string;

    @Column({type: 'varchar',length: 20, nullable: false,unique: true})
    curp:string;

    @Column({type: 'varchar',length: 15, unique: true})
    nss:string;

    @Column({type: 'varchar',length: 80, nullable: false})
    direccion: string;

    @Column({type: 'int', nullable: false})
    codigoPostal: number;

    @Column({type: 'varchar',length: 20, nullable: false,unique: true})
    licencia: string;



    @ManyToOne(type => EstatusEntity, { eager: true })// eager: true  carga automáticamente la relación
    @JoinColumn({ name: 'estatus_id' })
    estatus: EstatusEntity;




}