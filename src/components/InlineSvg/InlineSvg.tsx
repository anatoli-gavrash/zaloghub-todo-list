import type { SVGIcon } from '@/types/common';
import clsx from 'clsx';
import { ICON } from '@constants/svg';

interface InlineSVGProps {
  className?: string;
  name: SVGIcon;
}

const InlineSVG = ({ className, name }: InlineSVGProps) => {
  const Icon = ICON[name];

  return Icon ? <Icon className={clsx(className)} /> : null;
};

export default InlineSVG;
