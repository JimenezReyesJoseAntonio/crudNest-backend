import { ClienteTipoEntity } from "src/cliente-tipo/cliente-tipo.entity";
import { VehiculoEntity } from "src/vehiculo/vehiculo.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'cliente'})
export class ClienteEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar',length: 15, nullable: false})
    numTelefono: string;
    
    // Relación uno a muchos con VehiculoEntity
    @OneToMany(() => VehiculoEntity, vehiculo => vehiculo.cliente)
    vehiculos: VehiculoEntity[];

    @ManyToOne(type => ClienteTipoEntity, { eager: true })// eager: true  carga automáticamente la relación
    @JoinColumn({ name: 'clienteTipo_id' })
    clienteTipo: ClienteTipoEntity;

    @Column({type: 'int', nullable: false})
    eliminado: number;

}