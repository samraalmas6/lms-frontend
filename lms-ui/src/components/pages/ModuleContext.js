// ModuleContext.js
import { createContext, useContext, useState } from "react";

const ModuleContext = createContext();

export const ModuleProvider = ({ children }) => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  return (
    <ModuleContext.Provider value={{ selectedModule, setSelectedModule, selectedLesson, setSelectedLesson }}>
      {children}
    </ModuleContext.Provider>
  );
};

export const useModuleContext = () => useContext(ModuleContext);

