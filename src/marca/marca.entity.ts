import { ModeloEntity } from 'src/modelo/modelo.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('marcas')
export class MarcaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar',length: 20, nullable: false,unique: true})
  nombre: string;

  @OneToMany(() => ModeloEntity, modelo => modelo.marca)
  modelos: ModeloEntity[];
}
