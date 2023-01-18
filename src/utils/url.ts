import { getEnvOrFail } from '@utils/env';

const authApiHost = getEnvOrFail('AUTH_API_HOST');
const authApiPort = getEnvOrFail('AUTH_API_PORT');

export const authApiUrl = `http://${authApiHost}:${authApiPort}`;
