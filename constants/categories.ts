const CATEGORIES = Object.freeze({
  conference: 'conference-rooms',
  equipment: 'equipments',
  presentation: 'presentations',
  visitor: 'visitors',
});

export const MY_CATEGORIES = Object.freeze([
  {
    name: CATEGORIES.conference,
    title: '회의실 예약',
  },
  {
    name: CATEGORIES.visitor,
    title: '외부인 초대',
  },
  {
    name: CATEGORIES.equipment,
    title: '기자재 대여',
  },
  {
    name: CATEGORIES.presentation,
    title: '수요지식회',
  },
]);

export const BOCAL_CATEGORIES = Object.freeze(MY_CATEGORIES.slice(1));

export default CATEGORIES;
