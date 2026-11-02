import { useEffect, useState } from 'react';
import type { ChangeEventHandler } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import clsx from 'clsx';
import { v4 as uuid } from 'uuid';
import type { TodoTask } from '@/types/todo';
import { TODO } from '@constants/text';
import { localTasks } from '@services/browser/local-store';
import Message from '@components/Message/Message';
import TodoList from './TodoList/TodoList';
import TodoItem from './TodoItem/TodoItem';
import styles from './Todo.module.scss';
import TodoField from './TodoField/TodoField';

interface TodoProps {
  className?: string;
}

const TODO_CONFIG = {
  input: {
    min: 3,
    max: 300,
  }
};

const Todo = ({ className }: TodoProps) => {
  const [tasks, setTasks] = useState<TodoTask[]>(localTasks.get());
  const [inputError, setInputError] = useState<string>();

  const changeHandler = (id: string): ChangeEventHandler<HTMLInputElement> => (e) => {
    setTasks((state) => state.map((item) => item.id === id ? { ...item, checked: e.target.checked } : item));
  };

  const actionHandler = (formData: FormData) => {
    const newTaskText = String(formData.get('new-task') ?? '').replace(/\s+/g, ' ').trim();

    if (!newTaskText) {
      setInputError(TODO.input.error.empty);
    } else if (newTaskText.length < TODO_CONFIG.input.min) {
      setInputError(TODO.input.error.min);
    } else if (newTaskText.length > TODO_CONFIG.input.max) {
      setInputError(TODO.input.error.max);
    } else if (tasks.some(({ text }) => text.toLocaleLowerCase() === newTaskText.toLocaleLowerCase())) {
      setInputError(TODO.input.error.has);
    } else {
      setInputError(undefined);
      setTasks((state) => [ { id: uuid(), checked: false, text: newTaskText }, ...state ]);
    }
  };

  const deleteHandler = (id: string): React.MouseEventHandler<HTMLButtonElement> => () => {
    setTasks((state) => state.filter((item) => item.id !== id));
  };

  useEffect(() => {
    localTasks.set(tasks)
  }, [tasks]);

  return (
    <AnimatePresence>
      <motion.form
        className={clsx(className, styles.todo)}
        action={actionHandler}
        key={'list'}
        layout
        transition={{
          layout: {
            type: 'tween',
            ease: 'linear',
            duration: 0.15
          }
        }}
      >
        <div className={clsx(styles.todoBody)}>
          <TodoField
            name={'new-task'}
            placeholder={TODO.input.placeholder}
            error={inputError}
            button={{ type: 'submit', text: TODO.input.add, icon: 'plus', disabled: false }}
          />
          {tasks?.length > 0
            ? <TodoList>
                <>{tasks.map(({ id, checked, text }) => (
                  <TodoItem
                    text={text}
                    key={id}
                    name={id}
                    button={{ type: 'button', size: 'small', icon: 'trash', onClick: deleteHandler(id) }}
                    checked={checked}
                    onChange={changeHandler(id)}
                  />
                ))}</>
              </TodoList>
            : <Message className={clsx(styles.todoBodyMessage)} h3={TODO.empty.title} text={TODO.empty.text} />
          }
        </div>
      </motion.form>
    </AnimatePresence>
  );
};

export default Todo;
