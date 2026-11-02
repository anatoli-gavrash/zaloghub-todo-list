import type { JSX } from 'react';
import { AnimatePresence } from 'motion/react';
import clsx from 'clsx';
import styles from './TodoList.module.scss';

interface TodoListProps {
  children?: JSX.Element;
}

const TodoList = ({ children }: TodoListProps) => {
  return (
    <div className={clsx(styles.todoList)}>
      <AnimatePresence mode={'popLayout'}>
        {children}
      </AnimatePresence>
    </div>
  );
};

export default TodoList;
