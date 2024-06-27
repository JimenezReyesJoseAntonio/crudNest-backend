import { MarcaEntity } from "src/marca/marca.entity";
import { ModeloEntity } from "src/modelo/modelo.entity";
import { TiposVehiculoEntity } from "src/tipos-vehiculo/tipos-vehiculo.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import { VehiculoEntity } from "src/vehiculo/vehiculo.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'cotizaciones'})
export class CotizacionesEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'date', nullable: false})
    fecha: Date;

    @Column({type: 'float', nullable: false})
    monto: number;

    @Column({type: 'varchar',length: 80, nullable: false})
    ubicacionContacto: string;

    @Column({type: 'varchar',length: 80, nullable: false})
    ubicacionTermino: string;

    @Column({type: 'varchar',length: 15, nullable: false})
    numTelefono: string;

    @ManyToOne(() => UsuarioEntity)
    @JoinColumn({ name: 'usuario_id' })
    usuario: UsuarioEntity;

    @Column({type: 'varchar',length: 20, nullable: false})
    estado: string;

    @ManyToOne(() => TiposVehiculoEntity, { eager: true })
    @JoinColumn({ name: 'tiposVehiculo_id' })
    tipoVehiculo: TiposVehiculoEntity;
    
    @ManyToOne(() => MarcaEntity, { eager: true })
    @JoinColumn({ name: 'marca_id' })
    marca: MarcaEntity; 

    @ManyToOne(() => ModeloEntity, { eager: true })
    @JoinColumn({ name: 'modelo_id' })
    modelo: ModeloEntity;

    @Column({type: 'varchar',length: 20, nullable: false})
    placas: string;

    @Column({type: 'varchar',length: 25, nullable: false})
    serie: string;

    @Column({type: 'varchar',length: 25, nullable: false})
    poliza: string;
    
    @Column({type: 'varchar',length: 20, nullable: false})
    color: string;

    @Column({ type: 'int', nullable: false })
    ano:number;

    @Column({type: 'int', nullable: false})
    eliminado: number;


}