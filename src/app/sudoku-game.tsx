'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { ChevronsUpDown, Eraser, PaintBucket, DiamondPlus } from 'lucide-react';
import { Card } from "@/components/ui/card"
import useSearch from '@/hooks/useSearch';  // Import your custom hook
import { SearchResponse, SearchRequest } from '@/types/api';

import Board from '@/components/mine/board';

type SearchMethod = 'Linear' | 'Saltos' | 'Binária';

const SudokuGame: React.FC = () => {
  const [board, setBoard] = useState<number[][]>(Array(9).fill(null).map(() => Array(9).fill(0)));
  const [selectedMethods, setSelectedMethods] = useState<SearchMethod[]>(['Linear', 'Saltos', 'Binária']);
  const [searchResponse, setSearchResponse] = useState<SearchResponse | null>(null);
  const [styleType, setStyleType] = useState<'original' | 'grouped' | 'cool'>('grouped');
  
  const { search, data, loading, error } = useSearch();  // Using the custom hook

  const boardToString = (board: number[][]): string => {
    return board.flat().join('');
  };

  const handleCellClick = (row: number, col: number) => {
    const newBoard = [...board];
    newBoard[row][col] = (newBoard[row][col] + 1) % 10;
    setBoard(newBoard);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>, row: number, col: number) => {
    const key = parseInt(event.key)
    const newBoard = [...board]
    if (!isNaN(key) && key >= 0 && key <= 9) {
      newBoard[row][col] = key
    } else if (event.key === 'Delete' || event.key === 'Backspace') {
      newBoard[row][col] = 0
    }
    setBoard(newBoard)
  }

  const algorithmMapping: Record<SearchMethod, string> = {
    'Linear': 'linear',
    'Saltos': 'skip_list',
    'Binária': 'binary'
  };

  const handleSearch = async () => {
    const boardString = boardToString(board);
    const searchData: SearchRequest = {
      target: boardString,
      algorithms: selectedMethods.map(method => algorithmMapping[method])
    };
    const response = await search(searchData);
    setSearchResponse(response);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null).map(() => Array(9).fill(0)));
    setSearchResponse(null);
  };

  const handleStyleChange = () => {
    setStyleType(prevStyle => {
      const styles: ('original' | 'grouped' | 'cool')[] = ['original', 'grouped', 'cool'];
      const currentIndex = styles.indexOf(prevStyle);
      const nextIndex = (currentIndex + 1) % styles.length;
      return styles[nextIndex];
    });
  };

  const createExampleBoard = () => {
    const possibleExamples = ['006020000198000002300076008000600010813004567009031204900017800074080005280003000', '100500740700409080080000002600395004050610003300042150070000008268701095543960207', '002061005086704000700380040000239014005047800090800300543170098820503076007000003', '340175006070020534065043870714008920000700000003492060456309702032507410190004000', '146050720805762094090084003000003010023816907071290030368920005207500300900630281', '000430092001520308037069100090013507400790000000000800060000900170006480050000070', '105700200080205349002038015603050000000164002051300870504900020370500600200076050', '390702800050000030046008002900003001020400600504610203689020500030806000000007060', '821600400300009000060830501730410056182000700054703012008007204203548067006001080', '080207010090408600076010000008040300910030740004690002860300020001500970307129468']

    const randomIndex = Math.floor(Math.random() * possibleExamples.length);
    const example = possibleExamples[randomIndex];

    const newBoard = Array(9).fill(null).map((_, rowIndex) => 
      example.slice(rowIndex * 9, rowIndex * 9 + 9).split('').map(Number)
    );
    setBoard(newBoard);
  };

  const handleCreateExampleBoard = () => {
    createExampleBoard();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between mb-4">
              {selectedMethods.length > 0 
                ? `${selectedMethods.length} método${selectedMethods.length > 1 ? 's' : ''} selecionado${selectedMethods.length > 1 ? 's' : ''}`
                : "Selecionar Métodos de Busca"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full w-[300px]">
            <DropdownMenuLabel>Métodos de Busca</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(['Linear', 'Saltos', 'Binária'] as const).map((method) => (
              <DropdownMenuCheckboxItem
                key={method}
                checked={selectedMethods.includes(method)}
                onCheckedChange={() => setSelectedMethods(prev => prev.includes(method) ? prev.filter(m => m !== method) : [...prev, method])}
              >
                <span className="mr-2">{method}</span>
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Card className="p-4">
          <Board
            board={board}
            styleType={styleType}
            handleCellClick={handleCellClick}
            handleKeyPress={handleKeyPress}
          />
        </Card>

        <div className="w-full flex justify-right space-x-2 mt-2 flex-row-reverse">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={handleReset} className="w-8 h-8 ml-2" variant='outline'>
                  <Eraser className="h-2 w-2 shrink-0 opacity-50" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Limpar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>


          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={handleStyleChange} className="w-8 h-8" variant='outline'>
                  <PaintBucket className="h-2 w-2 shrink-0 opacity-50" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Mudar Estilo</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={handleCreateExampleBoard} className="w-8 h-8" variant='outline'>
                  <DiamondPlus className="h-2 w-2 shrink-0 opacity-50" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Adicionar Exemplo</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
         
        </div>

        <Button onClick={handleSearch} className="w-full mt-2">Pesquisar Solução</Button>

        {loading && <p className="mt-4 text-center">Carregando...</p>}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        {searchResponse && (
          <div className="mt-4">
            {Object.entries(searchResponse.results).map(([algorithm, response], index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold capitalize">{algorithm} Search</h3>
                <p className="text-sm text-gray-500">Índice: {response.index}</p>
                <p className="text-sm text-gray-500">Tempo: {response.time}</p>
                <p className="text-sm text-gray-500">Iterações: {response.iterations}</p>
                <p className="text-sm text-gray-500">Memória: {response.memory}</p>
                <p className="text-sm text-gray-500 break-words overflow-hidden">Resultado: {response.result}</p>
              </div>
            ))}
          </div>
        )}


      </div>
    </div>
  );
};

export default SudokuGame;
