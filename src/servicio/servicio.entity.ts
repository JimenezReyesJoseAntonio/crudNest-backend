import { ClienteEntity } from "src/cliente/cliente.entity";
import { OperadorEntity } from "src/operador/operador.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import { VehiculoEntity } from "src/vehiculo/vehiculo.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'servicio'})
export class ServicioEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar',length: 20, nullable: false})
    folioServicio: string;
    
    @Column({type: 'date', nullable: false})
    fecha: Date;

    @Column({type: 'varchar',length: 20, nullable: false})
    ubicacionSalida: string;

    @Column({type: 'varchar',length: 20, nullable: false})
    ubicacionContacto: string;

    @Column({type: 'float', nullable: false})
    montoCobrado: number;
    
    @Column({type: 'varchar',length: 20, nullable: false})
    obervaciones: string;

    @Column({type: 'varchar',length: 20, nullable: false})
    ubicacionTermino: string;

    @Column({type: 'varchar',length: 20, nullable: false})
    estadoServicio: string;

    @ManyToOne(() => ClienteEntity)
    @JoinColumn({ name: 'cliente_id' })
    cliente: ClienteEntity;

    @ManyToOne(() => VehiculoEntity)
    @JoinColumn({ name: 'vehiculo_id' })
    vehiculo: VehiculoEntity;

    @ManyToOne(() => OperadorEntity)
    @JoinColumn({ name: 'operador_id' })
    operador: OperadorEntity;

    @ManyToOne(() => UsuarioEntity)
    @JoinColumn({ name: 'usuario_id' })
    usuario: UsuarioEntity;

    

    

}