import { initializeSetup, startSetup } from './setup';
import { getEnvOrFail, successConnectionMsg } from '@utils/index';
import serverless from 'serverless-http';

const { server } = initializeSetup();

const PORT = getEnvOrFail('PORT');

void (async () => {
  try {
    await startSetup(server);
    server.listen(PORT, () =>
      successConnectionMsg(`${String.fromCodePoint(0x1f680)} Server is running on port ${PORT}`)
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    process.exitCode = 1;
  }
})();

export const express = serverless(server);
