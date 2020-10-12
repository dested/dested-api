import {ObjectId} from 'bson';
import {DbModels} from './dbModels';

export type DbICanHelp = {
  _id: ObjectId;
  project: string;
  sessionId: string;

  need: string;
  message: string;
  portfolio?: string;

  date: Date;

  ipAddress: string;
  referrer: string;
  isDesktopViewer: string;
  isMobileViewer: string;
  isTabletViewer: string;
  country: string;
  userAgent: string;
};
