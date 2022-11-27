import IParseMailTemplateDTO from "../../Template/dtos/IParseMailTemplateDTO";

export default interface ISendMailDTO{
    to: {
        name: string;
        email: string;
    }
    from?: {
        name: string;
        email: string;
    }
    subject: string;
    templateData: IParseMailTemplateDTO;
}
