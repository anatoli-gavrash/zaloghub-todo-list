import type { ComponentProps } from 'react';
import clsx from 'clsx';
import styles from './TodoField.module.scss';
import Button, { type ButtonProps } from '@components/Button/Button';

interface TodoFieldProps extends ComponentProps<'input'> {
  error?: string;
  button: ButtonProps;
}

const TodoField = ({
  type = 'text',
  error,
  button,
  ...props
}: TodoFieldProps) => {
  return (
    <div className={clsx(styles.todoField)}>
      <div className={clsx(styles.todoFieldBody)}>
        <input className={clsx(styles.todoFieldBodyInput)} type={type} {...props} />
        <Button className={clsx(styles.todoFieldBodyButton)} {...button} />
      </div>
      {error && <p className={clsx(styles.todoFieldError)}>{error}</p>}
    </div>
  );
};

export default TodoField;
