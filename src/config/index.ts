const prod = import.meta.env.PROD;
const config: { [key: string]: string | boolean } = {};

config.TOKEN = 'ENT';
config.prod = prod;

export default config;
