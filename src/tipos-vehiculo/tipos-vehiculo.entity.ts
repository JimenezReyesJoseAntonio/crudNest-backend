import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tipos_vehiculo'})
export class TiposVehiculoEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 30, nullable: false, unique: true})
    nombre: string;

}