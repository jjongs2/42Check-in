export default interface VisitorsFormInfo {
  visitorsId: number;
  intraId: string;
  visitorsName: string;
  visitDate: Date;
  visitTime: string;
  visitPurpose: number;
  relationWithUser: number;
  visitPlace: number;
  etcPurpose: string;
  etcRelation: string;
  etcPlace: string;
  agreement: boolean;
}
