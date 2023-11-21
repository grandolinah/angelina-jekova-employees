import classNames from 'classnames';
import { ButtonPropsType } from '@/app/types/button-type';
import styles from './Button.module.scss';

const Button = ({ content, className = '', onClickHandler }: ButtonPropsType) => {
  const buttonClassName = classNames(className, styles.button);

  return (
    <button
      type="button"
      onClick={onClickHandler}
      className={buttonClassName}
    >
      <span className={styles.button__content}>{content}</span>
      <div className={styles.button__gradient}></div>
    </button>
  );
};

export default Button
