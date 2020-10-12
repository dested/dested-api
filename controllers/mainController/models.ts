export interface HiRequest {}

export interface VoteRequest {
  project: string;
  sessionId: string;
  vote: 'good' | 'bad';
}

export interface ICanHelpRequest {
  project: string;
  sessionId: string;
  need: string;
  message: string;
  portfolio?: string;
}
export interface ClickedProjectRequest {
  project: string;
  sessionId: string;
  which: 'github' | 'website';
}
export interface ViewedProjectRequest {
  project: string;
  sessionId: string;
}
