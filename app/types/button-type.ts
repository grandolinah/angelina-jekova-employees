import { ReactNode } from 'react';

export type ButtonPropsType = {
  className?: string;
  onClickHandler: (_data: unknown) => void;
  content: ReactNode;
};
