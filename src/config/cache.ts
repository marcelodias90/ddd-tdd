//conectando ao redis
export default {
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDOS_PORT,
      password: process.env.REDIS_PASS || undefined
    }
  },
  driver: 'redis'
};
