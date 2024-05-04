import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { GruaEstatusEntity } from "./gruaEstatus.entity";
import { EstatusGruaEntity } from "src/estatus-grua/estatus-grua.entity";

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

    @OneToOne(() => EstatusGruaEntity, estatus => estatus.grua)
    estatusGrua: EstatusGruaEntity;

    @Column({type: 'int', nullable: false})
    eliminado: number;
    
}