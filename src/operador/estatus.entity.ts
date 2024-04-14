import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'estatus' })
export class EstatusEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 20, nullable: false })
    descripcion: string;

    @Column({type: 'int', nullable: false})
    eliminado: number;



}