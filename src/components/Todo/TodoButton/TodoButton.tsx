import type { ComponentProps } from 'react';
import clsx from 'clsx';
import styles from './TodoButton.module.scss';

interface TodoButtonProps extends ComponentProps<'input'> {
  text: string;
}

const TodoButton = ({ text, ...props }: TodoButtonProps) => {
  return (
    <label className={clsx(styles.todoButton)}>
      <input className={clsx(styles.todoButtonInput)} type={'radio'} {...props} />
      <span className={clsx(styles.todoButtonText)}>{text}</span>
    </label>
  );
};

export default TodoButton;
