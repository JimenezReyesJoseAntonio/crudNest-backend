import { Body, Controller, HttpStatus, Logger, Post, Res } from '@nestjs/common';
import { WhatsappCloudAPIRequest } from './dto/whatsapp-cloud-api-request.dto';
import { WhatsappService } from './whatsapp.service';

@Controller('whatsapp')
export class WhatsappController {

    private readonly logger = new Logger('whatsapp');

    constructor(private whatsappService: WhatsappService) {}
  
    @Post()
    async testMessage(
      @Body() request: WhatsappCloudAPIRequest,
      @Res() response,
    ) {
      this.logger.warn('testMessage');
      try {
        const result = await this.whatsappService.testMessage(request);
        response.status(HttpStatus.CREATED).json(result);
      } catch (error) {
        console.error('Error en WhatsappController:', error);
        response.status(HttpStatus.BAD_REQUEST).json({ error: 'Error al procesar la solicitud' });
      }
    }
}
