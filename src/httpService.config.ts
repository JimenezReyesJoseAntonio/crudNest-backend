import { Injectable } from "@nestjs/common";
import {HttpModuleOptions,HttpModuleOptionsFactory} from "@nestjs/axios";

@Injectable()

export class HtppConfigService implements HttpModuleOptionsFactory {
    createHttpOptions(): HttpModuleOptions {
        return{
            headers:{
                'Authorization': 'Bearer EAAUvdZAdm8cIBOZC8lygMnZCt1uy8p9NUNZA6v7kVTOKZAoJx9jgzjNrFPE1jBKAyidqcFrCI1qhEcgIPFg8rKPWaYF7mFOVSZCXWgnUewhFD9MZC5E3X8raz2XHwtJAEyirW7QfiHHaWmRA5bDY6IzdxSdncqjw1sYY8LZAGrFWfkO1uEKTOA7aOYvoxIlIPxdo',
                'Content-Type': 'application/json'

            }
        }

      
    }

}