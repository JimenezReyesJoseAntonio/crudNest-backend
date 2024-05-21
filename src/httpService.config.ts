import { Injectable } from "@nestjs/common";
import {HttpModuleOptions,HttpModuleOptionsFactory} from "@nestjs/axios";

@Injectable()

export class HtppConfigService implements HttpModuleOptionsFactory {
    createHttpOptions(): HttpModuleOptions {
        return{
            headers:{
                'Authorization': 'Bearer xxxxxxxxxxxxxxxxxxxxxxxxx',
                'Content-Type': 'application/json'

            }
        }

      
    }

}