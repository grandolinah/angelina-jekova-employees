import DataGrid from 'react-data-grid';
import { PreviewPropsType } from '@/app/types/preview-type';
import { mapRowValues } from '@/app/helpers/map-row-values';
import styles from './Preview.module.scss';

const Preview = ({ tableRows, values }: PreviewPropsType) => {
  const mappedRows = mapRowValues(values);
  const mappedColumns = tableRows.map((item) => ({
    key: item,
    name: item,
  }));

  return (
    <div className={styles.preview}>
      <DataGrid columns={mappedColumns} rows={mappedRows} />
    </div>
  );
};

export default Preview;
