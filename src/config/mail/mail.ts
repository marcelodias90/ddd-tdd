interface IMailConfig {
  drive: 'ethereal' | 'ses';
  default: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  drive: process.env.MAIL_DRIVE || 'ethereal',
  default: {
    from: {
      email: 'contato@marcelodeveloper.com',
      name: 'Marcelo Dias'
    }
  }
} as IMailConfig;
