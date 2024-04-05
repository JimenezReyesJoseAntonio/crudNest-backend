import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'estatusgrua' })
export class GruaEstatusEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 20, nullable: false })
    descripcion: string;

    

}