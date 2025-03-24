import React, { createContext, useContext, useState, ReactNode } from 'react';

type Cliente = {
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
    senha: string;
  };
  

type ClienteContextType = {
    cliente: Cliente | null;
    salvarCliente: (dados: Cliente) => void;
    logout: () => void;
    isClienteLogado: boolean;
  };



const ClienteContext = createContext<ClienteContextType | undefined>(undefined);

export const ClienteProvider = ({ children }: { children: ReactNode }) => {
  const [cliente, setCliente] = useState<Cliente | null>(null);
  

  const salvarCliente = (dados: Cliente) => {
    setCliente(dados);
  };
  
  const logout = () => setCliente(null);

  const isClienteLogado = !!cliente;

  return (
    <ClienteContext.Provider value={{ cliente, salvarCliente, logout, isClienteLogado }}>
      {children}
    </ClienteContext.Provider>
  );
};

export const useCliente = () => {
  const context = useContext(ClienteContext);
  
  if (!context) {
    throw new Error('useCliente deve ser usado dentro de um ClienteProvider');
  }
  return context;
};
