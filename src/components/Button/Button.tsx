import type { ComponentProps } from 'react';
import type { SVGIcon } from '@/types/common';
import clsx from 'clsx';
import styles from './Button.module.scss';
import InlineSVG from '@components/InlineSvg/InlineSvg';

interface ButtonProps extends ComponentProps<'button'> {
  color?: 'dark' | 'gray';
  size?: 'default' | 'small';
  text?: string;
  icon?: SVGIcon;
  iconPosition?: 'first' | 'last'
}

const Button = ({
  className,
  type = 'button',
  color = 'dark',
  size = 'default',
  icon = undefined,
  iconPosition = 'first',
  text = '',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        className,
        styles.button,
        styles[`button--${color}`],
        styles[`button--${size}`]
      )}
      {...props}
    >
      <span className={clsx(styles.buttonText)}>{text}</span>
      {icon && <InlineSVG className={clsx(styles.buttonIcon, styles[`buttonIcon--${iconPosition}`])} name={icon} />}
    </button>
  );
};

export default Button;
