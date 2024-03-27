import { Module } from '@nestjs/common';
import { GruaService } from './grua.service';
import { GruaController } from './grua.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GruaEntity } from './grua.entity';

@Module({
  imports:[TypeOrmModule.forFeature([GruaEntity])],
  controllers: [GruaController],
  providers: [GruaService]
})
export class GruaModule {}
