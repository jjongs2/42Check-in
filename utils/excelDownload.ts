import dayjs from 'dayjs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import apiController from './apiController';

export default async function ReactExcelDownload(category: string): Promise<void> {
  let downloadData: any = [];

  async function fetchData(): Promise<void> {
    const config = {
      url: `/bocal/subscriptions/${category}`,
    };
    const { data } = await apiController(config);
    downloadData = data;
  }
  await fetchData();
  console.log(downloadData);

  switch (category) {
    case 'visitors':
      downloadData.map((data: any) => {});
      break;

    case 'presensetaions':
      return;
    case 'equipments':
      return;
  }
  const excelFileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

  const excelDownload = (excelData: any): void => {
    console.log(excelData);
    const ws = XLSX.utils.aoa_to_sheet([[], Object.keys(excelData[0]), []]);
    excelData.map((data: any) => {
      XLSX.utils.sheet_add_aoa(ws, [Object.values(data)], { origin: -1 });
      // ws['!cols'] = [{}, { wpx: 200 }];
      return false;
    });
    const wb: any = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelButter = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const excelFile = new Blob([excelButter], { type: excelFileType });
    FileSaver.saveAs(excelFile, `${category}_${dayjs().format('YYYY.MM.DD')}.xlsx`);
  };

  excelDownload(downloadData);
}
