//criando um objeto para exportação global
export default {
  jwt: {
    secret: process.env.APP_SECRET, //variaveil de ambiente
    expiresIn: '1d'
  }
};
