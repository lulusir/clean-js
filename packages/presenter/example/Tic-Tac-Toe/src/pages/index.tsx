import React, { FC } from 'react';
import { usePresenter } from '@lujs/react-mvp-adaptor';
import { entry } from '@clean-js/presenter';
import { Board } from '@/components/Board';
import { GamePresenter } from '@/module/game.presenter';

import './index.less';

entry.init({ useDevTool: true });

const Game: FC = () => {
  const { presenter, state } = usePresenter<GamePresenter>(GamePresenter);

  const { history } = state;
  const current = history[state.stepNumber];
  const winner = presenter.calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => presenter.jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${state.xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => presenter.fall(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};
export default Game;
