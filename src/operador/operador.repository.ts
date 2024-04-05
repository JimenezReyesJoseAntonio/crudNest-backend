import { EntityRepository, Repository } from "typeorm";
import { OperadorEntity } from "./operador.entity";

@EntityRepository(OperadorEntity)
export class OperadorRepository extends Repository<OperadorEntity>{

}