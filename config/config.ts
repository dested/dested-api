import {SecureConfig} from './secureConfig';

export class Config {
  static get env(): 'LOCAL' | 'DEV' | 'PROD' {
    let key = SecureConfig.getKey('ENV') as 'STAG' | 'LOCAL' | 'DEV' | 'PROD';
    if (key === 'STAG') {
      key = 'DEV';
    }
    return key;
  }
  static get isConsole() {
    return !!process.env.IS_CONSOLE;
  }
  static get isOffline() {
    return !!process.env.IS_OFFLINE;
  }
  static get mongoConnectionString(): string {
    return SecureConfig.getKey('MONGO_CONNECTIONSTRING');
  }
  static get mongoDbName(): string {
    return SecureConfig.getKey('MONGO_DBNAME');
  }
}
