import { EntityRepository, Repository } from "typeorm";
import { GruaEstatusEntity } from "./gruaEstatus.entity";

@EntityRepository(GruaEstatusEntity)
export class GruaEstatusRepository extends Repository<GruaEstatusEntity>{

}