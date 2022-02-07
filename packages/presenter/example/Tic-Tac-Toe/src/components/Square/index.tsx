import { FC } from 'react';
import './index.less';

interface IProps {
  onClick: () => void;
  value: string | null;
}
export const Square: FC<IProps> = (props) => (
  <button className="square" onClick={props.onClick}>
    {props.value}
  </button>
);
