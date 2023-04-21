import nodemailer from 'nodemailer';
import aws from 'aws-sdk'; // faz a integração da sua ap. com os serviços da Amazon
import handlebarsMailTemplate from './HandlebarsMailTemplate';
import mailConfig from './mail';

interface IMailContact {
  name: string;
  email: string;
}

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export default class SESMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData
  }: ISendMail): Promise<void> {
    const mailTemplate = new handlebarsMailTemplate();

    const transporter = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01'
      })
    });

    const { email, name } = mailConfig.default.from;

    const message = await transporter.sendMail({
      from: {
        //from do transporte.sendmail
        name: from?.name || name,
        address: from?.email || email
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await mailTemplate.parse(templateData)
    });
  }
}
