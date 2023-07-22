import { EnvType, load } from "ts-dotenv";

export type Env = EnvType<typeof schema>;

export const schema = {
  NODE_ENV: String,
  API_PORT: String,
  GOOGLE_API_KEY: String,
  JWT_SECRET: String,
  JWT_EXPIRE: String,
  MONGO_URI: String,
};

export let env: Env;

export function loadEnv(): void {
  env = load(schema);
}
