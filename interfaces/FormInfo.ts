interface ConferenceRoom {
  formId: number;
  date: string;
  reservationInfo: number;
}

interface Visitors {
  formId: number;
  visitorName: string;
  date: string;
  visitTime: string;
  purpose: number;
  relation: number;
  place: number;
}

interface Presentations {
  formId: number;
  username: string;
  date: string;
  subject: string;
  contents: string;
  detail: string;
  time: number;
  type: number;
  screen: boolean;
}

interface Equipments {
  formId: number;
  userName: string;
  phoneNumber: string;
  date: string;
  equipments: number;
  purpose: boolean;
  detail: string;
  benefit: string;
  period: string;
  returnDate: string;
}

interface FormInfo {
  formInfo: ConferenceRoom | Visitors | Presentations | Equipments;
}

export default FormInfo;
