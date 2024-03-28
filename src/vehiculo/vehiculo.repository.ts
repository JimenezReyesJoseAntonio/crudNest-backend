import { EntityRepository, Repository } from "typeorm";
import { VehiculoEntity } from "./vehiculo.entity";

@EntityRepository(VehiculoEntity)
export class VehiculoRepository extends Repository<VehiculoEntity>{

}