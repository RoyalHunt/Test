interface Config {
  env: string;
  apiUrl: string;
}

const config: Config = {
  env: process.env.NODE_ENV || 'development',
  apiUrl: process.env.REACT_APP_API_URL ?? '',
};

export default config;
