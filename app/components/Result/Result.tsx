import DataGrid from 'react-data-grid';
import { findLongestWorkingPair } from '@/app/helpers/find-longest-working-pair';
import { ResultPropsType } from '@/app/types/result-type';
import styles from './Result.module.scss';
import { WorkingPairType } from '@/app/types/common';

const Result = ({ values }: ResultPropsType) => {
  const { longestWorkingPair, pairs } = findLongestWorkingPair(values);

  const mapResultValues = (data: WorkingPairType[]) => data.map((row, index: number) => ({
    ...row,
    id: index
  }));

  const columns = [
    { key: 'empIdOne', name: 'Employee ID #1' },
    { key: 'empIdTwo', name: 'Employee ID #2' },
    { key: 'projectId', name: 'Project ID' },
    { key: 'daysWorked', name: 'Days Worked' },
  ];

  const mappedRows = mapResultValues(pairs);

  return longestWorkingPair && (
    <div className={styles.result}>
      <div>
        <h2 className={styles.result__title}>Result</h2>
        <p className={styles.result__description}>The pair of employees who have worked
          together on common projects for the longest period of time:</p>
        <DataGrid
          columns={columns}
          rows={mappedRows}
          rowClass={(row: any) =>
            `${row.daysWorked}` === longestWorkingPair[3] ? styles.result__highlight : ''}
        />
      </div>
    </div>
  );
};

export default Result;
