import {ObjectId} from 'bson';
import {DbModels} from './dbModels';

export type DbViewedProjectModel = {
  _id: ObjectId;
  project: string;
  sessionId: string;


  date: Date;

  ipAddress: string;
  referrer: string;
  isDesktopViewer: string;
  isMobileViewer: string;
  isTabletViewer: string;
  country: string;
  userAgent: string;
};
