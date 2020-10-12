import {DocumentManager} from '../utils/db/dataManager';
import {DbErrorModel} from './dbError';
import {DbVoteModel} from './dbVote';
import {DbICanHelp} from './dbICanHelp';
import {DbViewedProjectModel} from './dbViewedProject';
import {DbClickedProjectModel} from './dbClickedProject';

export class DbModels {
  static error = new DocumentManager<DbErrorModel>('d-error');
  static vote = new DocumentManager<DbVoteModel>('d-vote');
  static iCanHelp = new DocumentManager<DbICanHelp>('d-iCanHelp');
  static viewedProject = new DocumentManager<DbViewedProjectModel>('d-viewedProject');
  static clickedProject = new DocumentManager<DbClickedProjectModel>('d-clickedProject');
}
