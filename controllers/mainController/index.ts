import {controller, request} from '../../utils/decorators';
import {RequestContext, RequestHeaders, ResponseError} from '../../utils/models';
import {ServerRouter} from '../serverRouter';
import {RequestModelValidator} from '../../utils/validation';
import {HiRequest, HiResponse} from './models';

@controller('main', {})
export class MainController {
  @request('GET', 'hi', {statusCodes: [400]})
  static async hi(model: HiRequest, headers: RequestHeaders, requestContext: RequestContext): Promise<HiResponse> {
    RequestModelValidator.validateHiRequest(model);

    return {hi: true};
  }
}

ServerRouter.registerClass(MainController);
