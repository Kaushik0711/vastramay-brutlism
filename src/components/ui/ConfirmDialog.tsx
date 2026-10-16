"use client";

import React from "react";
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalBody, ModalFooter } from "./Modal";
import { Button } from "./Button";
import { AlertTriangle } from "lucide-react";

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "CONFIRM",
  cancelLabel = "CANCEL",
  isDestructive = false,
  isLoading = false,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalHeader className="flex items-center gap-3 space-y-0">
        <div className={`p-2 border-2 border-brand-ink shadow-neo-sm ${isDestructive ? 'bg-brand-pink text-brand-ink' : 'bg-brand-yellow text-brand-ink'}`}>
          <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
        </div>
        <div>
          <ModalTitle>{title}</ModalTitle>
        </div>
      </ModalHeader>

      <ModalBody>
        <ModalDescription>{description}</ModalDescription>
      </ModalBody>

      <ModalFooter>
        <Button
          variant="outline"
          size="md"
          disabled={isLoading}
          onClick={onClose}
          className="w-full sm:w-auto"
        >
          {cancelLabel}
        </Button>
        <Button
          variant={isDestructive ? "primary" : "secondary"}
          size="md"
          isLoading={isLoading}
          onClick={onConfirm}
          className="w-full sm:w-auto"
        >
          {confirmLabel}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
