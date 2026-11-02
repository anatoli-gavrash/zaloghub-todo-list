import clsx from 'clsx';
import { WELCOME } from '@constants/text';
import Todo from '@components/Todo/Todo';
import styles from './Welcome.module.scss';

interface WelcomeProps {
  className?: string;
}

const Welcome = ({ className }: WelcomeProps) => {
  return (
    <section className={clsx(className, styles.welcome, 'width')}>
      <h1 className={clsx(styles.welcomeTitle)}>{WELCOME.title}</h1>
      <Todo />
    </section>
  );
};

export default Welcome;
