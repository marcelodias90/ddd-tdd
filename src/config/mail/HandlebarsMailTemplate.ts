import handlebars from 'handlebars';
import fs from 'fs';

//criando uma interface com propriedade dinamica
interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

export default class handlebarsMailTemplate {
  public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    //lendo o arquivo como readFile do fs para depois fazer o parser
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8'
    });
    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
