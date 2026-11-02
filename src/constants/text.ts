export const WELCOME = {
  title: 'Todo List',
} as const;

export const TODO = {
  input: {
    add: 'Add',
    placeholder: 'Введите текст задачи',
    error: {
      empty: 'В строке должны быть печатные символы',
      min: 'Недостаточное количество символов',
      max: 'Превышено максимальное количество символов',
      has: 'Такая задача уже есть',
      incorrect: 'В строке встречаются некорректные символы'
    }
  },
  empty: {
    title: 'Список задач пуст',
    text: 'Добавьте новую задачу'
  }
} as const;

export const TODO_FILTER = {
  all: {
    title: 'Все',
    group: 'filter',
    value: 'all'
  },
  active: {
    title: 'Активные',
    group: 'filter',
    value: 'active'
  },
  completed: {
    title: 'Завершённые',
    group: 'filter',
    value: 'completed'
  }
} as const;

export type TodoFilterKey = keyof typeof TODO_FILTER;
