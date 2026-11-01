import clsx from 'clsx';
import styles from './Message.module.scss';

interface MessageProps {
  className?: string;
  h2?: string;
  h3?: string;
  text?: string;
}

const Message = ({ className, h2, h3, text }: MessageProps) => {
  return (
    <div className={clsx(className, styles.message)}>
      {h2 && <h2 className={clsx(styles.messageTitle)}>{h2}</h2>}
      {h3 && <h3 className={clsx(styles.messageTitle)}>{h3}</h3>}
      {text && <p className={clsx(styles.messageText)}>{text}</p>}
    </div>
  );
};

export default Message;
