"use client";

import ResumeModal from "./ResumeModal";
import { useResume } from "../context/ResumeContext";

export default function ResumeModalWrapper() {
  const { isModalOpen, closeModal } = useResume();

  return <ResumeModal isOpen={isModalOpen} onClose={closeModal} />;
}
