import React from 'react';

// Props for the board component
interface BoardProps {
  board: number[][]; // 9x9 Sudoku board data
  styleType: 'original' | 'grouped' | 'cool'; // Style type for the board
  handleCellClick: (row: number, col: number) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLDivElement>, row: number, col: number) => void;
}

const OriginalStyle: React.FC<BoardProps> = ({ board, handleCellClick, handleKeyPress }) => (
  <div className="grid grid-cols-9 gap-0.5">
    {board.map((row, rowIndex) => (
      row.map((cell, colIndex) => (
        <div
          key={`${rowIndex}-${colIndex}`}
          className={`w-10 h-10 flex items-center justify-center border border-gray-300 cursor-pointer select-none
            ${colIndex % 3 === 2 && colIndex !== 8 ? 'border-r-2 border-r-gray-500' : ''}
            ${rowIndex % 3 === 2 && rowIndex !== 8 ? 'border-b-2 border-b-gray-500' : ''}`}
          onClick={() => handleCellClick(rowIndex, colIndex)}
          onKeyDown={(e) => handleKeyPress(e, rowIndex, colIndex)}
          tabIndex={0}
        >
          {cell !== 0 ? (
            <span className="text-xl font-semibold">{cell}</span>
          ) : (
            <span className="text-xl font-semibold text-gray-200">0</span>
          )}
        </div>
      ))
    ))}
  </div>
);

const GroupedStyle: React.FC<BoardProps> = ({ board, handleCellClick, handleKeyPress }) => (
  <div className="grid grid-cols-9 gap-0.5">
    {board.map((row, rowIndex) => (
      row.map((cell, colIndex) => {
        const isGray = Math.floor(rowIndex / 3) % 2 === Math.floor(colIndex / 3) % 2;
        return (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`w-10 h-10 flex items-center justify-center cursor-pointer select-none border border-gray-200
              ${isGray ? 'bg-gray-100' : 'bg-white'} rounded-md`}
            onClick={() => handleCellClick(rowIndex, colIndex)}
            onKeyDown={(e) => handleKeyPress(e, rowIndex, colIndex)}
            tabIndex={0}
          >
            {cell !== 0 ? (
              <span className="text-xl font-semibold">{cell}</span>
            ) : (
              <span className="text-xl font-semibold text-gray-200">0</span>
            )}
          </div>
        );
      })
    ))}
  </div>
);

const CoolStyle: React.FC<BoardProps> = ({ board, handleCellClick, handleKeyPress }) => (
  <div className="grid grid-cols-9 gap-0.5">
    {board.map((row, rowIndex) => (
      row.map((cell, colIndex) => (
        <div
          key={`${rowIndex}-${colIndex}`}
          className={`w-10 h-10 flex items-center justify-center cursor-pointer select-none
            bg-gradient-to-br from-purple-400 via-blue-300 to-green-200 text-white shadow-lg`}
          onClick={() => handleCellClick(rowIndex, colIndex)}
          onKeyDown={(e) => handleKeyPress(e, rowIndex, colIndex)}
          tabIndex={0}
        >
          {cell !== 0 ? (
            <span className="text-xl font-semibold text-white">{cell}</span>
          ) : (
            <span className="text-xl font-semibold text-gray-300">0</span>
          )}
        </div>
      ))
    ))}
  </div>
);

const Board: React.FC<BoardProps> = ({ board, styleType, handleCellClick, handleKeyPress }) => {
  switch (styleType) {
    case 'grouped':
      return <GroupedStyle board={board} handleCellClick={handleCellClick} handleKeyPress={handleKeyPress} />;
    case 'cool':
      return <CoolStyle board={board} handleCellClick={handleCellClick} handleKeyPress={handleKeyPress} />;
    case 'original':
    default:
      return <OriginalStyle board={board} handleCellClick={handleCellClick} handleKeyPress={handleKeyPress} />;
  }
};

export default Board;