process.env.IS_OFFLINE = 'true';
import {Config} from '../../config/config';
import {SecureConfig} from '../../config/secureConfig';

async function main() {
  process.env.IS_CONSOLE = 'true';
  process.env.IS_OFFLINE = 'true';
  await SecureConfig.setup();
  console.log('start', Config.mongoDbName);
}

main()
  .catch((e) => console.error(e))
  .then(() => {});
