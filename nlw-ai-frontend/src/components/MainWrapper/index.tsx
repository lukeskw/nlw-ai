import React, { ReactNode } from "react";

interface MainWrapperProps {
  children: ReactNode;
}

export const MainWrapper: React.FC<MainWrapperProps> = ({ children }) => {
  return <div className="min-h-screen flex flex-col">{children}</div>;
};

