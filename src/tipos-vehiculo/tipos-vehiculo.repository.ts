import { TiposVehiculoEntity } from './tipos-vehiculo.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(TiposVehiculoEntity)
export class TiposVehiculoRepository extends Repository<TiposVehiculoEntity> {}