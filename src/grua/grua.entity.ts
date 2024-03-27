import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'grua'})
export class GruaEntity{

    @PrimaryGeneratedColumn()
    noEco: number;

    @Column({type: 'varchar',length: 20, nullable: false,unique: true})
    placa: string;

    @Column({type: 'varchar',length: 20, nullable: false,unique: true})
    serie: string;

    @Column({type: 'varchar',length: 20, nullable: false,unique: true})
    noPermiso: string;

    @Column({type: 'varchar',length: 20,unique: true})
    aseguradora: string;

    @Column({type: 'varchar',length: 20, unique: true})
    noPoliza:string;

    @Column({ type: 'int', nullable: false })
    año:number;

    @Column({type: 'int', nullable: false})
    kmSalida: number;

    @Column({type: 'varchar',length: 10, nullable: false})
    kmEntrada: string;

    




}