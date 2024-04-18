import { Module } from '@nestjs/common';
import { ClienteTipoService } from './cliente-tipo.service';
import { ClienteTipoController } from './cliente-tipo.controller';
import { ClienteTipoEntity } from './cliente-tipo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteTipoEntity])],
  providers: [ClienteTipoService],
  controllers: [ClienteTipoController]
})
export class ClienteTipoModule {}
