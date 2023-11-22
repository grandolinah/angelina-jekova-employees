import { useRef, useState, ChangeEvent } from 'react';
import { CSVLink, CSVDownload } from 'react-csv';
import Papa from 'papaparse';
import { InputPropsType } from '@/app/types/input-type';
import Button from '@/app/components/Button/Button';
import styles from './Input.module.scss';
import { DataRow } from '@/app/types/common';

const CSV_DATA = [
  ['EmpID','ProjectID','DateFrom','DateTo'],
  ['143','12','2013-11-01','2014-01-05'],
  ['218','10','2012-05-16','NULL'],
  ['143','10','2009-01-01','2011-04-27'],
  ['217','10','2012-05-16','2012-07-16'],
  ['212','10','2012-05-16','2012-07-16'],
  ['1','22','2023-05-15','2023-05-17'],
  ['2','22','2023-05-15','2023-05-25']
];

const Input = ({ onUpload }: InputPropsType) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<any>();// TODO:
  const [uploadedFileName, setUploadedFileName] = useState('');

  const onClickInputHandler = () => {
    if (!inputFileRef.current) return;

    inputFileRef.current.click();
  };

  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.files) return;

    setUploadedFileName(event.target.files[0].name);

    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rowsArray: string[][] = [];
        const valuesArray: string[][] = [];

        results.data.map((cell) => {
          rowsArray.push(Object.keys(cell as DataRow));
          valuesArray.push(Object.values(cell as DataRow));
        });

        onUpload(rowsArray[0], valuesArray);
      },
    });
  };

  return (
    <div className={styles.input}>
      <label htmlFor='input' className={styles.input__label}>CSV file</label>
      <input
        className={styles['input__file-input']}
        id="input"
        ref={inputFileRef}
        type="file"
        name="file"
        accept=".csv"
        value={selectedFile}
        onChange={onChangeInputHandler}
      />
      <span className={styles.input__file}>
        {uploadedFileName}
      </span>
      <Button
        className={styles.input__button}
        onClickHandler={onClickInputHandler}
        content="Add file"
      />
      <CSVLink data={CSV_DATA}>Download example</CSVLink>
    </div>
  );
};

export default Input;

