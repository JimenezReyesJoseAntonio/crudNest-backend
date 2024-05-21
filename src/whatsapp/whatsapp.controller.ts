import { Body, Controller, HttpStatus, Logger, Post, Res } from '@nestjs/common';
import { WhatsappCloudAPIRequest } from './dto/whatsapp-cloud-api-request.dto';
import { WhatsappService } from './whatsapp.service';

@Controller('whatsapp')
export class WhatsappController {

    private readonly logger = new Logger('whatsapp');
    constructor(private testsService: WhatsappService){ }

    @Post()
    testMessage(@Body() request: WhatsappCloudAPIRequest, @Res() response){
        this.logger.warn('testMessage');
        this.testsService.testMessage(request).then( res =>{
            response.status(HttpStatus.CREATED).json(res);

        }).catch((err) =>{
            console.log(err.response.data.error);
            response.status(HttpStatus.BAD_REQUEST).json(err)
        })
    }
}
