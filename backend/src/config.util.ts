import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

interface Config {
  NODE_ENV: string;
  PORT: number;
  MONGODB_URI: string;
}

export const config: Config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3000', 10),
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/your_database',
};

// Validate required environment variables
export const validateConfig = (): void => {
  const requiredEnvVars: (keyof Config)[] = [
    'MONGODB_URI',
  ];

  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !config[envVar]
  );

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(', ')}`
    );
  }
};

export default config;
