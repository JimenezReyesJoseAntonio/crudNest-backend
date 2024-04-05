import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'vehiculo'})
export class VehiculoEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar',length: 20, nullable: false,unique: true})
    placa: string;
}