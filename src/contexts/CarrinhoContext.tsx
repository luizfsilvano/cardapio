import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Alimento } from '@src/data/cardapio';

type CarrinhoContextType = {
  itens: Alimento[];
  adicionarItem: (item: Alimento) => void;
  limparCarrinho: () => void;
};

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export const CarrinhoProvider = ({ children }: { children: ReactNode }) => {
  const [itens, setItens] = useState<Alimento[]>([]);

  const adicionarItem = (item: Alimento) => {
    setItens((prev) => [...prev, item]);
  };

  const limparCarrinho = () => {
    setItens([]);
  };

  return (
    <CarrinhoContext.Provider value={{ itens, adicionarItem, limparCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error('useCarrinho deve ser usado dentro de um CarrinhoProvider');
  }
  return context;
};
