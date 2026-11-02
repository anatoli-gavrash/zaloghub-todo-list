import type { ComponentProps } from 'react';
import { motion } from 'motion/react';
import clsx from 'clsx';
import type { ButtonProps } from '@components/Button/Button';
import Button from '@components/Button/Button';
import styles from './TodoItem.module.scss';

interface TodoItemProps extends ComponentProps<'input'> {
  text: string;
  button: ButtonProps;
}

const TodoItem = ({ text, button, ...props }: TodoItemProps) => {
  return (
    <motion.div
      className={clsx(styles.todoItem)}
      layout
      initial={{ y: '2%', opacity: 0, scale: 0.95 }}
      animate={{ y: '0%', opacity: 1, scale: 1 }}
      exit={{ y: '2%', opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15 }}
    >
      <label className={clsx(styles.todoItemLabel)}>
        <input className={clsx(styles.todoItemLabelInput)} type={'checkbox'} {...props} />
        <span className={clsx(styles.todoItemLabelText)}>{text}</span>
      </label>
      <Button className={clsx(styles.todoItemButton)} {...button} />
    </motion.div>
  );
};

export default TodoItem;
