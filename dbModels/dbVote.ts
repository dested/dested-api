import {ObjectId} from 'bson';
import {DbModels} from './dbModels';

export type DbVoteModel = {
  _id: ObjectId;
  project: string;
  vote: 'good' | 'bad';
  date: Date;

  sessionId: string;

  ipAddress: string;
  referrer: string;
  isDesktopViewer: string;
  isMobileViewer: string;
  isTabletViewer: string;
  country: string;
  userAgent: string;
};

export class DbVoteLogic {
  static async log(category: string, message: string, request: any) {
    const error = await DbModels.error.insertDocument({
      category,
      message,
      request: JSON.stringify(request),
      date: new Date(),
    });
    console.error(error);
  }
}
