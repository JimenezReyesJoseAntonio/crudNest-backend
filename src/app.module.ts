import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './config/constants';
import { ProductoModule } from './producto/producto.module';

import { UsuarioModule } from './usuario/usuario.module';
import { RolModule } from './rol/rol.module';
import { AuthModule } from './auth/auth.module';
import { OperadorModule } from './operador/operador.module';
import { GruaModule } from './grua/grua.module';
import { VehiculoModule } from './vehiculo/vehiculo.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal:true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get<string>(DB_HOST),
        port: +configService.get<number>(DB_PORT),
        username: configService.get<string>(DB_USER),
        password: configService.get<string>(DB_PASSWORD),
        database: configService.get<string>(DB_DATABASE),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging:false
      }),
      inject: [ConfigService],

    }), 
    ProductoModule,
    UsuarioModule,
    RolModule,
    AuthModule,
    OperadorModule,
    GruaModule,
    VehiculoModule,
 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
