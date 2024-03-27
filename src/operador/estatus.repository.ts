import { EntityRepository, Repository } from "typeorm";
import { EstatusEntity } from "./estatus.entity";

@EntityRepository(EstatusEntity)
export class EstatusRepository extends Repository<EstatusEntity>{

}