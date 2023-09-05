import { PERIODS } from '@/components/form/EquipmentsForm';
import { IS_VIDEO, LECTURES } from '@/components/form/PresentationsForm';
import { PLACES } from '@/components/form/VisitorsForm';
import STATUS from '@/constants/status';
import TIMES from '@/constants/times';
import dayjs from 'dayjs';
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import apiController from './apiController';

export default async function exportData(category: string): Promise<void> {
  let formInfos = [];

  async function getData(): Promise<void> {
    const config = {
      url: `/bocal/subscriptions/${category}`,
    };
    const { data } = await apiController(config);
    formInfos = data;
  }
  await getData();

  switch (category) {
    case 'equipments': {
      formInfos = formInfos.map((formInfo) => {
        const { equipment, etcEquipment, etcPurpose, period, purpose, status } = formInfo;
        formInfo.equipment = etcEquipment ?? PLACES[equipment - 1];
        formInfo.purpose = etcPurpose ?? PLACES[purpose - 1];
        formInfo.period = PERIODS[period];
        formInfo.status = STATUS[status];
        delete formInfo.etcEquipment;
        delete formInfo.etcPurpose;
        delete formInfo.extension;
        return formInfo;
      });
      break;
    }
    case 'presentations': {
      formInfos = formInfos.map((formInfo) => {
        const { screen, status, time, type } = formInfo;
        formInfo.screen = IS_VIDEO[screen];
        formInfo.status = STATUS[status];
        formInfo.time = TIMES[time];
        formInfo.type = LECTURES[type];
        delete formInfo.formIds;
        return formInfo;
      });
      break;
    }
    case 'visitors': {
      formInfos = formInfos.map((formInfo) => {
        const {
          etcPlace,
          etcPurpose,
          etcRelation,
          relationWithUser,
          status,
          visitPlace,
          visitPurpose,
        } = formInfo;
        formInfo.relationWithUser = etcRelation ?? PLACES[relationWithUser - 1];
        formInfo.status = STATUS[status];
        formInfo.visitPlace = etcPlace ?? PLACES[visitPlace - 1];
        formInfo.visitPurpose = etcPurpose ?? PLACES[visitPurpose - 1];
        delete formInfo.agreement;
        delete formInfo.etcPlace;
        delete formInfo.etcPurpose;
        delete formInfo.etcRelation;
        return formInfo;
      });
      break;
    }
  }

  const excelFileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

  const ws = XLSX.utils.aoa_to_sheet([[], Object.keys(formInfos[0])]);
  formInfos.map((data: any) => {
    XLSX.utils.sheet_add_aoa(ws, [Object.values(data)], { origin: -1 });
    // ws['!cols'] = [{}, { wpx: 200 }];
    return false;
  });
  const wb: any = { Sheets: { data: ws }, SheetNames: ['data'] };
  const excelButter = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const excelFile = new Blob([excelButter], { type: excelFileType });
  FileSaver.saveAs(excelFile, `${category}_${dayjs().format('YYYY.MM.DD')}.xlsx`);
}
