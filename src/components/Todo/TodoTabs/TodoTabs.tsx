import type { JSX } from 'react';
import { motion } from 'motion/react';
import clsx from 'clsx';
import styles from './TodoTabs.module.scss';

interface TodoTabsProps {
  children?: JSX.Element;
}

const TodoTabs = ({ children }: TodoTabsProps) => {
  return (
    <motion.div
      className={clsx(styles.todoTabs)}
      layout={'position'}
    >
      {children}
    </motion.div>
  );
};

export default TodoTabs;
