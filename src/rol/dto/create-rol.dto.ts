import { IsEnum } from "class-validator";
import { RolNombre } from "../rol.enum";



export class CreateRolDto{

    @IsEnum(RolNombre,{message:'el rol solo puede ser user o admin'})
    rolNombre: RolNombre;
}