import {controller, request} from '../../utils/decorators';
import {RequestContext, RequestHeaders, ResponseError} from '../../utils/models';
import {ServerRouter} from '../serverRouter';
import {RequestModelValidator} from '../../utils/validation';
import {ClickedProjectRequest, HiRequest, ICanHelpRequest, ViewedProjectRequest, VoteRequest} from './models';
import {DbModels} from '../../dbModels/dbModels';
import {DbVoteLogic} from '../../dbModels/dbVote';
import {VoidResponse} from '../../models/controller';

@controller('main', {})
export class MainController {
  @request('POST', 'vote', {statusCodes: []})
  static async vote(
    model: VoteRequest,
    headers: RequestHeaders,
    requestContext: RequestContext
  ): Promise<VoidResponse> {
    RequestModelValidator.validateVoteRequest(model);
    await DbModels.vote.insertDocument({
      date: new Date(),
      project: model.project,
      vote: model.vote,
      sessionId: model.sessionId,

      ipAddress: requestContext.identity.sourceIp,
      referrer: (headers as any).Referer,
      isDesktopViewer: (headers as any)['CloudFront-Is-Desktop-Viewer'],
      isMobileViewer: (headers as any)['CloudFront-Is-Mobile-Viewer'],
      isTabletViewer: (headers as any)['CloudFront-Is-Tablet-Viewer'],
      country: (headers as any)['CloudFront-Viewer-Country'],
      userAgent: (headers as any)['User-Agent'],
    });

    return {};
  }

  @request('POST', 'i-can-help', {statusCodes: []})
  static async iCanHelp(
    model: ICanHelpRequest,
    headers: RequestHeaders,
    requestContext: RequestContext
  ): Promise<VoidResponse> {
    RequestModelValidator.validateICanHelpRequest(model);
    await DbModels.iCanHelp.insertDocument({
      date: new Date(),
      project: model.project,
      need: model.need,
      portfolio: model.portfolio,
      message: model.message,
      sessionId: model.sessionId,

      ipAddress: requestContext.identity.sourceIp,
      referrer: (headers as any).Referer,
      isDesktopViewer: (headers as any)['CloudFront-Is-Desktop-Viewer'],
      isMobileViewer: (headers as any)['CloudFront-Is-Mobile-Viewer'],
      isTabletViewer: (headers as any)['CloudFront-Is-Tablet-Viewer'],
      country: (headers as any)['CloudFront-Viewer-Country'],
      userAgent: (headers as any)['User-Agent'],
    });

    return {};
  }

  @request('POST', 'viewed-project', {statusCodes: []})
  static async viewedProject(
    model: ViewedProjectRequest,
    headers: RequestHeaders,
    requestContext: RequestContext
  ): Promise<VoidResponse> {
    RequestModelValidator.validateViewedProjectRequest(model);
    await DbModels.viewedProject.insertDocument({
      date: new Date(),
      project: model.project,
      sessionId: model.sessionId,

      ipAddress: requestContext.identity.sourceIp,
      referrer: (headers as any).Referer,
      isDesktopViewer: (headers as any)['CloudFront-Is-Desktop-Viewer'],
      isMobileViewer: (headers as any)['CloudFront-Is-Mobile-Viewer'],
      isTabletViewer: (headers as any)['CloudFront-Is-Tablet-Viewer'],
      country: (headers as any)['CloudFront-Viewer-Country'],
      userAgent: (headers as any)['User-Agent'],
    });

    return {};
  }

  @request('POST', 'clicked-project', {statusCodes: []})
  static async clickedProject(
    model: ClickedProjectRequest,
    headers: RequestHeaders,
    requestContext: RequestContext
  ): Promise<VoidResponse> {
    RequestModelValidator.validateClickedProjectRequest(model);
    await DbModels.clickedProject.insertDocument({
      date: new Date(),
      project: model.project,
      sessionId: model.sessionId,
      which: model.which,

      ipAddress: requestContext.identity.sourceIp,
      referrer: (headers as any).Referer,
      isDesktopViewer: (headers as any)['CloudFront-Is-Desktop-Viewer'],
      isMobileViewer: (headers as any)['CloudFront-Is-Mobile-Viewer'],
      isTabletViewer: (headers as any)['CloudFront-Is-Tablet-Viewer'],
      country: (headers as any)['CloudFront-Viewer-Country'],
      userAgent: (headers as any)['User-Agent'],
    });

    return {};
  }

  @request('GET', 'hi', {statusCodes: []})
  static async hi(model: HiRequest, headers: RequestHeaders, requestContext: RequestContext): Promise<VoidResponse> {
    RequestModelValidator.validateHiRequest(model);

    return {};
  }
}

ServerRouter.registerClass(MainController);
