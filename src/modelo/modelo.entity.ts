import { MarcaEntity } from 'src/marca/marca.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('modelos')
export class ModeloEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar',length: 20, nullable: false})
  nombre: string;

  @Column({ name: 'marca_id' })
  marcaId: number;

  @ManyToOne(() => MarcaEntity, marca => marca.modelos)
  @JoinColumn({ name: 'marca_id' })
  marca: MarcaEntity;
}
