import { ClienteEntity } from "src/cliente/cliente.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'vehiculo'})
export class VehiculoEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar',length: 20, nullable: false})
    tipoVehiculo: string;
    
    @Column({type: 'varchar',length: 25, nullable: false})
    marca: string;

    @Column({type: 'varchar',length: 20, nullable: false})
    modelo: string;

    @Column({type: 'varchar',length: 20, nullable: false})
    placas: string;

    @Column({type: 'varchar',length: 25, nullable: false})
    serie: string;
    
    @Column({type: 'varchar',length: 20, nullable: false})
    color: string;

    @Column({ type: 'int', nullable: false })
    ano:number;
    
    @ManyToOne(() => ClienteEntity, cliente => cliente.vehiculos, { eager: true })
    cliente: ClienteEntity;

    @Column({type: 'int', nullable: false})
    eliminado: number;
    

}