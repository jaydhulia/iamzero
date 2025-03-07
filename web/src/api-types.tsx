export interface Event {
  time: string;
  data: AWSData;
  identity: AWSIdentity;
}

export interface AWSData {
  service: string;
  region: string;
  operation: string;
  /**
   * Parameters may be a string, or an object themselves.
   *  An example is dynamodb keys which are in the form "key": {"id": "1"}
   */
  parameters: Record<string, string | Record<string, unknown>>;
  exceptionMessage: string;
  exceptionCode: string;
}

export interface AWSIdentity {
  user: string;
  role: string;
  account: string;
}

export interface Recommendation {
  Description: RecommendationDescription[];
  Comment: string;
  ID: string;
}

export interface RecommendationDescription {
  AppliedTo: string;
  Type: string;
  Policy: Record<string, any>;
}

export interface AWSIAMPolicy {
  Version: "2012-10-17";
  Statement: AWSIAMStatement[];
}

export interface AWSIAMStatement {
  Sid: string;
  Effect: "Allow";
  Action: string | string[];
  Resource: string[];
}

export type AlertStatus = "active" | "fixed" | "applying" | "ignored";

/** An alert that iam-zero has generated recommendations for */
export interface AlertWithRecommendations {
  id: string;
  event: Event;
  time: Date;
  status: AlertStatus;
  recommendations: Recommendation[];
  hasRecommendations: true;
}

/** An alert that we do not yet handle and haven't generated recommendations for */
export interface UnhandledAlert {
  id: string;
  event: Event;
  time: Date;
  status: AlertStatus;
  recommendations: null;
  hasRecommendations: false;
}

export type Alert = AlertWithRecommendations | UnhandledAlert;
