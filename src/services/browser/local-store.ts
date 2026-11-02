import type { TodoTask } from '@/types/todo';
import { TODO_FILTER, type TodoFilterKey } from '@constants/text';

export const localStoreKey = {
  TASKS: 'tasks',
  FILTER: 'filter',
} as const;

export type LocalStoreKey = typeof localStoreKey[keyof typeof localStoreKey];

const isJSON = (string: string): boolean => {
  try {
    JSON.parse(string);
  } catch {
    return false;
  }

  return true;
};

export const getLocalData = (key: LocalStoreKey) => {
  const result = localStorage.getItem(key);

  return result && isJSON(result) ? JSON.parse(result) : null;
};

export const setLocalData = <T>(key: LocalStoreKey, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const deleteLocalData = (key: LocalStoreKey) => {
  localStorage.removeItem(key);
};

export const localTasks = {
  get(): TodoTask[] {
    const data: TodoTask[] = getLocalData(localStoreKey.TASKS)?.map((task: string) => {
      const [id, checked, text] = task.split(':');

      return { id, checked: JSON.parse(checked), text };
    }) || [];

    return data;
  },
  set(array: TodoTask[]) {
    const data = array.map(({ id, checked, text }) => `${id}:${checked}:${text}`);

    setLocalData(localStoreKey.TASKS, data);
  },
  delete() {
    deleteLocalData(localStoreKey.TASKS);
  }
};

export const localFilter = {
  get(): TodoFilterKey {
    return getLocalData(localStoreKey.FILTER) || TODO_FILTER.all.value;
  },
  set(filter: TodoFilterKey) {
    setLocalData(localStoreKey.FILTER, filter);
  },
  delete() {
    deleteLocalData(localStoreKey.FILTER);
  }
};
