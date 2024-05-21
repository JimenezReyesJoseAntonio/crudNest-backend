import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { BASEURL } from 'src/common/api-resource';
import { WhatsappCloudAPIRequest } from './dto/whatsapp-cloud-api-request.dto';
import { AxiosResponse } from 'axios';
import { WhatsappCloudAPIResponse } from './dto/whatsapp-cloud-api-response.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WhatsappService {

    constructor(private httpService: HttpService){}

    baseUrl = BASEURL.baseUrlWhatsappCloudApi;

    async testMessage(request:  WhatsappCloudAPIRequest): Promise<AxiosResponse<WhatsappCloudAPIResponse>>{
        const { data } = await firstValueFrom(this.httpService.post(this.baseUrl,request));
        console.log(data);
        return data;
    }
}
