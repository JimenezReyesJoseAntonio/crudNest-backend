import { Module } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { WhatsappController } from './whatsapp.controller';
import { HttpModule } from '@nestjs/axios';
import { HtppConfigService } from 'src/httpService.config';

@Module({
  imports:[
    HttpModule.registerAsync({
      useClass: HtppConfigService,
    }
    ),
  ],
  providers: [WhatsappService],
  controllers: [WhatsappController]
})
export class WhatsappModule {}
