import type { ComponentProps } from 'react';
import { motion } from 'motion/react';
import clsx from 'clsx';
import Button, { type ButtonProps } from '@components/Button/Button';
import styles from './TodoField.module.scss';

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
    <motion.div
      className={clsx(styles.todoField)}
      layout={'position'}
    >
      <div className={clsx(styles.todoFieldBody)}>
        <input className={clsx(styles.todoFieldBodyInput)} type={type} {...props} />
        <Button className={clsx(styles.todoFieldBodyButton)} {...button} />
      </div>
      {error && <p className={clsx(styles.todoFieldError)}>{error}</p>}
    </motion.div>
  );
};

export default TodoField;
