import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NuevoUsuarioDto } from './dto/nuevo-usuario.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Get()
    getAll() {
        return this.authService.getall();
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post('nuevo')
    create(@Body() dto: NuevoUsuarioDto) {
        return this.authService.create(dto);
    }
}
