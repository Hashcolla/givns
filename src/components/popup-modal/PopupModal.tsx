"use client";

import { X } from "lucide-react";
import React, {
  createContext,
  InputHTMLAttributes,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { AnimatePresence, motion } from "motion/react";

type PopUpModalContextType = {
  renderModal: React.Dispatch<SetStateAction<ReactNode | null>>;
  close: () => void;
};

const ModalProvider = createContext<PopUpModalContextType | undefined>(
  undefined,
);

type PopUpModalProps = {
  children: ReactNode;
};

const PopupModal = ({ children }: PopUpModalProps) => {
  const [render, setRender] = useState<ReactNode | null>(null);

  const close = () => {
    setRender(null);
  };

  return (
    <ModalProvider value={{ renderModal: setRender, close }}>
      {children}
      <AnimatePresence>
        {render && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="fixed inset-0 flex h-screen w-full bg-black/30 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 70, transition: { duration: 0.3 } }}
              className="relative m-auto w-[600px] rounded-4xl bg-black px-5 pt-8 pb-7"
              onClick={(e) => e.stopPropagation()}
            >
              {render}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ModalProvider>
  );
};

export default PopupModal;

export const usePopUpModal = () => {
  const ctx = useContext(ModalProvider);

  if (!ctx) {
    throw new Error("usePopUpModal must be used within a PopupModalProvider");
  }

  return ctx;
};

type PopUpModalRootProps = {
  header: ReactNode;
} & PropsWithChildren;

export const PopUpModalRoot = ({ header, children }: PopUpModalRootProps) => {
  return (
    <div className="h-full">
      <div className="">{header}</div>
      <div className="scrollbar-hide mt-5 max-h-[600px] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

type PopUpModalHeaderProps = {
  title: string;
  button?: ReactNode;
};

export const PopUpModalHeader = ({ title, button }: PopUpModalHeaderProps) => {
  const { close } = usePopUpModal();
  return (
    <div className="flex w-full items-center justify-between">
      <div className="text-surface flex items-center text-2xl font-semibold">
        {button && (
          <div onClick={close} className="mr-5 cursor-pointer">
            <X
              size={28}
              className="text-secondary hover:bg-secondary/20 rounded-full p-1"
            />
          </div>
        )}
        {title}
      </div>
      {!button ? (
        <div onClick={close} className="cursor-pointer">
          <X size={30} className="text-secondary" />
        </div>
      ) : (
        button
      )}
    </div>
  );
};

type PopUpModalFieldProps = {
  name: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const PopUpModalField = ({
  name,
  ...inputProps
}: PopUpModalFieldProps) => {
  return (
    <input
      name={name}
      className="bg-input/30 h-[50px] w-full rounded-xl px-4 outline-0"
      type="text"
      {...inputProps}
    />
  );
};
