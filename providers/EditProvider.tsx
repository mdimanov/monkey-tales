"use client";

import { EditContextType } from "@/Types";
import { Id } from "@/convex/_generated/dataModel";
import React, { createContext, useContext, useState, ReactNode } from "react";

const EditContext = createContext<EditContextType | undefined>(undefined);

export const EditProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeTaleId, setActiveTaleId] = useState<Id<"tales"> | null>(null);

  return (
    <EditContext.Provider value={{ activeTaleId, setActiveTaleId }}>
      {children}
    </EditContext.Provider>
  );
};

export const useEditContext = () => {
  const context = useContext(EditContext);
  if (context === undefined) {
    throw new Error("useEditContext must be used within an EditProvider");
  }
  return context;
};
