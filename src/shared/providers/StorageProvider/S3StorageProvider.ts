import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import uploadConfig from '@config/upload';
import mime from 'mime';

export default class S3StorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1'
    });
  }
  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file); //pegando o caminho do arquivo com o nome

    const ContentType = mime.getType(originalPath); //pegando o tipo do arquivo com a biblioteca mime

    if (!ContentType) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath); //pegando todo o conteudo do arquivo

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket, //pegando o nome do bucket
        Key: file,
        ACL: 'public-read', //dano permisao para leitura do arquivo
        Body: fileContent,
        ContentType //passando o ContentType
      })
      .promise(); //transformando o metodo em uma promessa pra usa o await

    await fs.promises.unlink(originalPath); //eliminando o arquivo da pasta temp apos ser enviado pra outra pasta

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket, //pegando o nome do bucket
        Key: file
      })
      .promise(); //transformando o metodo em uma promessa pra usa o await;
  }
}
