import Welcome from '@components/Welcome/Welcome';
import clsx from 'clsx';

const App = () => {
  return (
    <main className={clsx('main')}>
      <Welcome />
    </main>
  );
};

export default App;
