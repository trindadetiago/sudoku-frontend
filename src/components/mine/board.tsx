import React from 'react';

// Props for the board component
interface BoardProps {
  board: number[][]; // 9x9 Sudoku board data
  solutionBoard?: number[][] | null; // Solution board data (optional)
  styleType: 'original' | 'grouped' | 'cool'; // Style type for the board
  handleCellClick: (row: number, col: number) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLDivElement>, row: number, col: number) => void;
}

const OriginalStyle: React.FC<BoardProps> = ({ board, solutionBoard, handleCellClick, handleKeyPress }) => (
  <div className="grid grid-cols-9 gap-0.5">
    {board.map((row, rowIndex) => (
      row.map((cell, colIndex) => (
        <div
          key={`${rowIndex}-${colIndex}`}
          className={`w-10 h-10 flex items-center justify-center border border-zinc-400 cursor-pointer select-none
            ${colIndex % 3 === 2 && colIndex !== 8 ? 'border-r-2 border-r-zinc-500 dark:border-r-zinc-100' : ''}
            ${rowIndex % 3 === 2 && rowIndex !== 8 ? 'border-b-2 border-b-zinc-500 dark:border-b-zinc-100' : ''}
            dark:bg-zinc-700 dark:text-zinc-300`}
          onClick={() => handleCellClick(rowIndex, colIndex)}
          onKeyDown={(e) => handleKeyPress(e, rowIndex, colIndex)}
          tabIndex={0}
        >
          {solutionBoard && solutionBoard[rowIndex][colIndex] !== cell ? (
            <span className="text-xl font-semibold text-green-600 dark:text-green-700">{solutionBoard[rowIndex][colIndex]}</span>
          ) : cell !== 0 ? (
            <span className="text-xl font-semibold text-black dark:text-white">{cell}</span>
          ) : (
            <span className="text-xl font-semibold text-zinc-200 dark:text-zinc-500">0</span>
          )}
        </div>
      ))
    ))}
  </div>
);

const GroupedStyle: React.FC<BoardProps> = ({ board, solutionBoard, handleCellClick, handleKeyPress }) => (
  <div className="grid grid-cols-9 gap-0.5">
    {board.map((row, rowIndex) => (
      row.map((cell, colIndex) => {
        const iszinc = Math.floor(rowIndex / 3) % 2 === Math.floor(colIndex / 3) % 2;
        return (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`w-10 h-10 flex items-center justify-center cursor-pointer select-none border border-zinc-200
              ${iszinc ? 'bg-zinc-100 dark:bg-zinc-700' : 'bg-white dark:bg-zinc-900'} rounded-md dark:text-zinc-300`}
            onClick={() => handleCellClick(rowIndex, colIndex)}
            onKeyDown={(e) => handleKeyPress(e, rowIndex, colIndex)}
            tabIndex={0}
          >
            {solutionBoard && solutionBoard[rowIndex][colIndex] !== cell ? (
              <span className="text-xl font-semibold text-green-600 dark:text-green-700">{solutionBoard[rowIndex][colIndex]}</span>
            ) : cell !== 0 ? (
              <span className="text-xl font-semibold text-black dark:text-white">{cell}</span>
            ) : (
              <span className="text-xl font-semibold text-zinc-200 dark:text-zinc-500">0</span>
            )}
          </div>
        );
      })
    ))}
  </div>
);

const CoolStyle: React.FC<BoardProps> = ({ board, solutionBoard, handleCellClick, handleKeyPress }) => (
  <div className="grid grid-cols-9 gap-0.5">
    {board.map((row, rowIndex) => (
      row.map((cell, colIndex) => (
        <div
          key={`${rowIndex}-${colIndex}`}
          className={`w-10 h-10 flex items-center justify-center cursor-pointer select-none
            bg-gradient-to-br from-purple-400 via-blue-300 to-green-200 text-white shadow-lg
            dark:from-purple-600 dark:via-blue-500 dark:to-green-400`}
          onClick={() => handleCellClick(rowIndex, colIndex)}
          onKeyDown={(e) => handleKeyPress(e, rowIndex, colIndex)}
          tabIndex={0}
        >
          {solutionBoard && solutionBoard[rowIndex][colIndex] !== cell ? (
            <span className="text-xl font-semibold text-green-300 dark:text-green-700">{solutionBoard[rowIndex][colIndex]}</span>
          ) : cell !== 0 ? (
            <span className="text-xl font-semibold text-white">{cell}</span>
          ) : (
            <span className="text-xl font-semibold text-zinc-300 dark:text-zinc-500">0</span>
          )}
        </div>
      ))
    ))}
  </div>
);

const Board: React.FC<BoardProps> = ({ board, solutionBoard, styleType, handleCellClick, handleKeyPress }) => {
  switch (styleType) {
    case 'grouped':
      return <GroupedStyle board={board} solutionBoard={solutionBoard} handleCellClick={handleCellClick} handleKeyPress={handleKeyPress} />;
    case 'cool':
      return <CoolStyle board={board} solutionBoard={solutionBoard} handleCellClick={handleCellClick} handleKeyPress={handleKeyPress} />;
    case 'original':
    default:
      return <OriginalStyle board={board} solutionBoard={solutionBoard} handleCellClick={handleCellClick} handleKeyPress={handleKeyPress} />;
  }
};

export default Board;
