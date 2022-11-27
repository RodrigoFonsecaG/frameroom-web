import handlebars from "handlebars";
import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";
import IMailTemplate from "../models/IMailTemplate";
import fs from 'fs';

class HandlebarsMailTemplate implements IMailTemplate{
    public async parse({ file, variables }: IParseMailTemplateDTO): Promise<string>{
        const templateFileContent = await fs.promises.readFile(file, {
            encoding: 'utf-8'
        })

        const parseTemplate = handlebars.compile(templateFileContent);

        return parseTemplate(variables)
    }
}

export default HandlebarsMailTemplate;
