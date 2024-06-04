import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { BASEURL } from 'src/common/api-resource';
import { WhatsappCloudAPIRequest } from './dto/whatsapp-cloud-api-request.dto';
import { AxiosResponse } from 'axios';
import { WhatsappCloudAPIResponse } from './dto/whatsapp-cloud-api-response.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WhatsappService {

    constructor(private httpService: HttpService) {}

    private baseUrl = BASEURL.baseUrlWhatsappCloudApi;
  
    async testMessage(
      request: WhatsappCloudAPIRequest,
    ): Promise<AxiosResponse<WhatsappCloudAPIResponse>> {
      try {
        const { data } = await this.httpService.post(
          this.baseUrl,
          request,
        ).toPromise();
        console.log(data);
        return data;
      } catch (error) {
        console.error('Error en WhatsappService:', error);
        throw new Error('Error al enviar el mensaje por WhatsApp');
      }
    }
}
