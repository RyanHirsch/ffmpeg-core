function isEnv(env) {
  return () => process.env.NODE_ENV === env; // eslint-disable-line no-process-env
}

export const isDevelopment = isEnv('development');
export const isProduction = isEnv('production');
export const isTest = isEnv('test');
