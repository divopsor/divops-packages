export function ensureEnv(key: string) {
  const value = process.env[key] ?? '';

  if (value === '') {
    throw new Error(`process.env.${key} is not exists.`);
  }

  return value;
}
