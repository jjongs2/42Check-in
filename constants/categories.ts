const CATEGORIES = Object.freeze({
  conference: 'conference-rooms',
  visitor: 'visitors',
  presentation: 'presentations',
  equipment: 'equipments',
});

export const MY_CATEGORIES = [
  {
    name: CATEGORIES.conference,
    title: '회의실 예약',
  },
  {
    name: CATEGORIES.visitor,
    title: '외부인 초대',
  },
  {
    name: CATEGORIES.presentation,
    title: '수요지식회',
  },
  {
    name: CATEGORIES.equipment,
    title: '기자재 대여',
  },
];

export const VOCAL_CATEGORIES = MY_CATEGORIES.slice(1);

export default CATEGORIES;
