import {config} from 'dotenv';
config();
import 'source-map-support/register';
import './controllers';
import {SecureConfig} from './config/secureConfig';
import {ServerRouter} from './controllers/serverRouter';
import {DataManager} from './utils/db/dataManager';
import {LambdaRequestEvent} from './utils/models';
import {assert} from './utils/typeUtils';
import {DbErrorLogic} from './dbModels/dbError';
import {Utils} from './utils/utils';

for (const cron of ServerRouter.bespokeCalls) {
  module.exports[cron.key] = async (ev: any, context: any) => {
    await SecureConfig.setup();
    await warmDB();
    return await cron.invoke(ev, context);
  };
}

async function warmDB() {
  console.log('handler: getting db');
  const db = await DataManager.dbConnection();
  console.log('handler: got db');

  await Utils.timeoutPromise(db.stats(), 4000, null, async () => {
    console.log('handler: timeout stats. disconnecting');
    await DataManager.disconnectDB();
    console.log('handler: disconnected');
  });
  console.log('handler: ready');
}

module.exports.api = async (event: LambdaRequestEvent<any>, context: any) => {
  if (event.path === '/robots.txt' || event.path === '/' || event.path === '') {
    return {statusCode: 404, body: ''};
  }

  await SecureConfig.setup();
  // await warmDB();

  let result = ServerRouter.endpoints
    .filter((e) => e.method.toLowerCase() === event.httpMethod.toLowerCase())
    .map((endpoint) => ({result: endpoint.match(event.path), endpoint}))
    .filter((a) => a.result);

  if (result.length > 1) {
    const found = result.filter((a) => a.result !== false && Object.keys(a.result.params).length === 0);
    if (found.length === 1) {
      result = found;
    } else {
      await DbErrorLogic.log('BAD 404 1', JSON.stringify(event), '');
    }
  }

  if (result.length === 1) {
    assert(result[0].result !== false);
    if (result[0].result.params) {
      // console.log(Object.keys(result[0].result.params));
      for (const paramsKey in result[0].result.params) {
        event.pathParameters[paramsKey] = result[0].result.params[paramsKey];
      }
    }
    return result[0].endpoint.invoke(event, context);
  }

  console.error('404', event.path);
  return {
    statusCode: 404,
    body: '',
  };
};
