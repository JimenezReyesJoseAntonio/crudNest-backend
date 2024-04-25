import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GruaEstatusEntity } from "./gruaEstatus.entity";

@Entity({name:'grua'})
export class GruaEntity{

    @PrimaryGeneratedColumn()
    noEco: number;

    @Column({type: 'varchar',length: 20, nullable: false,unique: true})
    placa: string;

    @Column({type: 'varchar',length: 30, nullable: false,unique: true})
    serie: string;

    @Column({type: 'varchar',length: 30, nullable: false,unique: true})
    noPermiso: string;

    @Column({type: 'varchar',length: 30})
    aseguradora: string;

    @Column({type: 'varchar',length: 30, unique: true})
    noPoliza:string;

    @Column({ type: 'int', nullable: false })
    ano:number;

    @Column({type: 'int', nullable: false})
    kilometraje: number;


    @ManyToOne(type => GruaEstatusEntity, { eager: true })// eager: true  carga automáticamente la relación
    @JoinColumn({ name: 'estatus_id' })
    estatus: GruaEstatusEntity;

    @Column({type: 'int', nullable: false})
    eliminado: number;
    
}