import { useEffect, useMemo, useState } from 'react';
import type { ChangeEventHandler } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import clsx from 'clsx';
import { v4 as uuid } from 'uuid';
import type { TodoTask } from '@/types/todo';
import { TODO, TODO_FILTER, type TodoFilterKey } from '@constants/text';
import { localFilter, localTasks } from '@services/browser/local-store';
import Message from '@components/Message/Message';
import TodoField from './TodoField/TodoField';
import TodoTabs from './TodoTabs/TodoTabs';
import TodoButton from './TodoButton/TodoButton';
import TodoList from './TodoList/TodoList';
import TodoItem from './TodoItem/TodoItem';
import styles from './Todo.module.scss';

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
  const [filter, setFilter] = useState<TodoFilterKey>(localFilter.get());
  const [inputError, setInputError] = useState<string>();

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'all':
        return tasks;
      case 'active':
        return tasks.filter(({checked}) => !checked);
      case 'completed':
        return tasks.filter(({checked}) => checked);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const changeTaskHandler = (id: string): ChangeEventHandler<HTMLInputElement> => (e) => {
    setTasks((state) => state.map((item) => item.id === id ? { ...item, checked: e.target.checked } : item));
  };

  const changeFilterHandler = (value: TodoFilterKey): ChangeEventHandler<HTMLInputElement> => () => {
    setFilter(value);
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
    localTasks.set(tasks);
  }, [tasks]);

  useEffect(() => {
    localFilter.set(filter);
  }, [filter]);

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
          <TodoTabs>
            <>{[TODO_FILTER.all, TODO_FILTER.active, TODO_FILTER.completed].map(({ title, group, value }) => (
              <TodoButton
                text={title}
                key={value}
                name={group}
                value={value}
                checked={filter === value}
                onChange={changeFilterHandler(value)}
              />
            ))}</>
          </TodoTabs>
          {filteredTasks?.length > 0
            ? <TodoList>
                <>{filteredTasks.map(({ id, checked, text }) => (
                  <TodoItem
                    text={text}
                    key={id}
                    name={id}
                    button={{ type: 'button', size: 'small', icon: 'trash', onClick: deleteHandler(id) }}
                    checked={checked}
                    onChange={changeTaskHandler(id)}
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
