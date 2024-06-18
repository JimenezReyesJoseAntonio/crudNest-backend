export interface WhatsappCloudAPIRequest {
    messaging_product: string;
    to:                string;
    type:              string;
    template:          Template;
}

export interface Template {
    name:       string;
    language:   Language;
    components: Component[];
}

export interface Component {
    type:       string;
    parameters: Parameter[];
}

export interface Parameter {
    type: string;
    text?: string;
    document?:  Document;

}

export interface Document {
    link: string;
    filename: string;
  }

export interface Language {
    code: string;
}
