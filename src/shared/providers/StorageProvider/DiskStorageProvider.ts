import uploadConfig from '@config/upload';
import fs from 'fs';
import path from 'path';

export default class DiskStorageProvider {
  public async saveFile(file: string): Promise<string> {
    //pegando o arquivo q esta temporariamente na pasta tempo e movendo pro uploads
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.directory, file)
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.directory, file);

    try {
      await fs.promises.stat(filePath); //verificando se o arquivo existe
    } catch {
      return; //caso o arquivo n existe retorna nada
    }

    await fs.promises.unlink(filePath);
  }
}
