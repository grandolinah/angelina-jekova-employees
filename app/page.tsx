'use client';
import { useState } from 'react';
import 'react-data-grid/lib/styles.css';
import Input from '@/app/components/Input';
import Preview from '@/app/components/Preview';
import Result from '@/app/components/Result';
import styles from './Page.module.scss';

export default function Home() {
  const [tableRows, setTableRows] = useState<string[]>([]);
  const [values, setValues] = useState<string[][]>([]);

  const onUploadHandler = (tableRows: string[], values: string[][]) => {
    setTableRows(tableRows);
    setValues(values);
  };

  return (
    <main className={styles.page}>
      <h1 className={styles.page__title}>Pair of employees who have worked together</h1>
      <Input onUpload={onUploadHandler} />
      <Preview tableRows={tableRows} values={values} />
      <Result values={values} />
    </main>
  );
};
