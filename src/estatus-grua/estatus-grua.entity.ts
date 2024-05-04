import { GruaEntity } from "src/grua/grua.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'estatus_grua'})
export class EstatusGruaEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 20, nullable: false})
    nombreEstatus: string;

    @OneToOne(() => GruaEntity, grua => grua.estatusGrua)
    @JoinColumn({ name: 'grua_id' })
    grua: GruaEntity;

}
