"use client";

import React, { createContext, useContext, useState } from "react";

interface ResumeContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ResumeContext = createContext<ResumeContextType>({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ResumeContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => useContext(ResumeContext);
