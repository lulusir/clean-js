import React, { FC } from 'react';
import { entry } from '@clean-js/presenter';
import { Square } from '../Square';
import { ISquares } from '@/module/game.model';

import './index.less';

interface IProps {
  onClick: (i: number) => void;
  squares: ISquares;
}

export const Board: FC<IProps> = ({ onClick, squares }) => {
  const renderSquare = (i: number) => (
    <Square value={squares[i]} onClick={() => onClick(i)} />
  );

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};
