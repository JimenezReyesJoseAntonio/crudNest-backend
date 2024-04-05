import { EntityRepository, Repository } from "typeorm";
import { GruaEntity } from "./grua.entity";

@EntityRepository(GruaEntity)
export class GruaRepository extends Repository<GruaEntity>{

}