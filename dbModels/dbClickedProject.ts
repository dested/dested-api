import {ObjectId} from 'bson';
import {DbModels} from './dbModels';

export type DbClickedProjectModel = {
  _id: ObjectId;
  project: string;
  sessionId: string;
  which: 'github' | 'website';


  date: Date;

  ipAddress: string;
  referrer: string;
  isDesktopViewer: string;
  isMobileViewer: string;
  isTabletViewer: string;
  country: string;
  userAgent: string;
};
