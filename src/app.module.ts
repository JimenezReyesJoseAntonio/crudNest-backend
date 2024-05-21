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
import { ClienteModule } from './cliente/cliente.module';
import { ClienteTipoModule } from './cliente-tipo/cliente-tipo.module';
import { ServicioModule } from './servicio/servicio.module';
import { EstatusOperadorModule } from './estatus-operador/estatus-operador.module';
import { EstatusGruaModule } from './estatus-grua/estatus-grua.module';
import { PdfCartaModule } from './files/pdf-carta/pdf-carta.module';
import { MarcaModule } from './marca/marca.module';
import { ModeloModule } from './modelo/modelo.module';
import { TransaccionServiceModule } from './transaccion-service/transaccion-service.module';
import { TiposVehiculoModule } from './tipos-vehiculo/tipos-vehiculo.module';
import { ExcelServiciosModule } from './files/excel-servicios/excel-servicios.module';
import { ExcelOperadoresModule } from './files/excel-operadores/excel-operadores.module';
import { ExcelGruasModule } from './files/excel-gruas/excel-gruas.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';

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
    ClienteModule,
    ClienteTipoModule,
    ServicioModule,
    EstatusOperadorModule,
    EstatusGruaModule,
    PdfCartaModule,
    MarcaModule,
    ModeloModule,
    TransaccionServiceModule,
    TiposVehiculoModule,
    ExcelServiciosModule,
    ExcelOperadoresModule,
    ExcelGruasModule,
    WhatsappModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
