import { EntityRepository, Repository } from "typeorm";
import { ClienteTipoEntity } from "./cliente-tipo.entity";

@EntityRepository(ClienteTipoEntity)
export class ClienteTipoRepository extends Repository<ClienteTipoEntity>{

}