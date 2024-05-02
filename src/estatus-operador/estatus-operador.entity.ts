import { OperadorEntity } from "src/operador/operador.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'estatus_operador'})
export class EstatusOperadorEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 20, nullable: false})
    nombreEstatus: string;

    @OneToOne(() => OperadorEntity, operador => operador.estatusOperador)
    @JoinColumn({ name: 'operador_id' })
    operador: OperadorEntity;

}
