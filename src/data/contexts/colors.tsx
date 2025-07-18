import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Colors, defaultColors } from '../../assets/theme/colors';

// Definição do tipo do contexto
interface ThemeContextType {
  colors: Colors;
  setColor: (key: keyof Colors, value: string) => void;
  background: string;
  setBackground: (value: string) => void;
}

// Criando o contexto com um valor inicial genérico
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Estado inicial com as cores padrão
  const [colors, setColors] = useState<Colors>(defaultColors);
  const [background, setBackground] = useState<string>('#6EC2F7');

  // Função para atualizar uma cor dinamicamente
  const setColor = (key: keyof Colors, value: string) => {
    setColors(prevColors => ({
      ...prevColors,
      [key]: value,
    }));
  };

  return (
    <ThemeContext.Provider
      value={{ colors, setColor, background, setBackground }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Hook para acessar o tema
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};
