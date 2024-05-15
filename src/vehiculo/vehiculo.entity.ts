import { ClienteEntity } from "src/cliente/cliente.entity";
import { MarcaEntity } from "src/marca/marca.entity";
import { ModeloEntity } from "src/modelo/modelo.entity";
import { TiposVehiculoEntity } from "src/tipos-vehiculo/tipos-vehiculo.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'vehiculo'})
export class VehiculoEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => TiposVehiculoEntity, { eager: true })
    @JoinColumn({ name: 'tiposVehiculo_id' })
    tipoVehiculo: TiposVehiculoEntity;
    
    
    @Column({type: 'varchar',length: 20, nullable: false})
    placas: string;

    @Column({type: 'varchar',length: 25, nullable: false})
    serie: string;
    
    @Column({type: 'varchar',length: 20, nullable: false})
    color: string;

    @Column({ type: 'int', nullable: false })
    ano:number;

    @ManyToOne(() => MarcaEntity, { eager: true })
    @JoinColumn({ name: 'marca_id' })
    marca: MarcaEntity;

    @ManyToOne(() => ModeloEntity, { eager: true })
    @JoinColumn({ name: 'modelo_id' })
    modelo: ModeloEntity;

    @ManyToOne(() => ClienteEntity, cliente => cliente.vehiculos, { eager: true })
    cliente: ClienteEntity;

    @Column({type: 'int', nullable: false})
    eliminado: number;
    

}