import { loadConfig, str, url, port, json } from '@/shared/loadConfig';

export const APPConfig = loadConfig({
  logLevel: {
    env: 'APP_LOG_LEVEL',
    type: json({
      default: `["error", "warn"]`,
    }),
  },
  appName: {
    env: 'APP',
    type: str({
      example: 'finder',
    }),
  },
});
