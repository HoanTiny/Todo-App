import React, { createContext, useState, ReactNode } from 'react';

// Định nghĩa kiểu dữ liệu cho AppContext
interface AppContextType {
  selectedCategoryId: number;
  setSelectedCategoryId: (id: number) => void;
}

// Tạo context với giá trị mặc định
export const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);

  return (
    <AppContext.Provider
      value={{
        selectedCategoryId,
        setSelectedCategoryId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
