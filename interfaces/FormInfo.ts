import type ConferenceRoomsInfo from './ConferenceRoomsInfo';
import type EquipmentsFormInfo from './EquipmentsFormInfo';
import type PresentationsFormInfo from './PresentationsFormInfo';
import type VisitorsFormInfo from './VisitorsFormInfo';

type FormInfo = ConferenceRoomsInfo | EquipmentsFormInfo | PresentationsFormInfo | VisitorsFormInfo;

export type ApplicationFormInfo = EquipmentsFormInfo | PresentationsFormInfo | VisitorsFormInfo;

export default FormInfo;
