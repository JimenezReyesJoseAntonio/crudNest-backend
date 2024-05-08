import { EntityRepository, Repository } from "typeorm";
import { MarcaEntity } from "./marca.entity";

@EntityRepository(MarcaEntity)
export class MarcaRepository extends Repository<MarcaEntity>{

}