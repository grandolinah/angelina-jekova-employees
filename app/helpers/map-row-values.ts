import { DataRow } from '@/app/types/common';

export const mapRowValues = (arrays: string[][]) => {
  const rows: DataRow[] = [];

  arrays.forEach((array, index) => {
    const [EmpID, ProjectID, DateTo, DateFrom] = array;

    rows.push({
      id: index,
      EmpID,
      ProjectID,
      DateTo,
      DateFrom
    });
  });

  return rows;
};
