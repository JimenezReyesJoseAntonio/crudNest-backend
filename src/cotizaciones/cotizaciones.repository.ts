import { EntityRepository, Repository } from "typeorm";
import { CotizacionesEntity } from "./cotizaciones.entity";

@EntityRepository(CotizacionesEntity)
export class CotizacionesRepository extends Repository<CotizacionesEntity>{

}