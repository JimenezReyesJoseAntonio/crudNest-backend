import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank-decorator";

export class ProductoDto {
       
        @IsNotBlank({message: 'el nombre no puede estar vacio'})
        nombre?: string;

        @IsNumber()
        @IsNotEmpty()
        precio?: number;
}