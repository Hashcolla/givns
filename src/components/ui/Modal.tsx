"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import {
  createContext,
  use,
  useCallback,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
  type SetStateAction,
} from "react";
import {Button} from "./Button";
import InfoSvg from "@/assets/images/svg/InfoSvg";
import TitleWithBio, { TitleWithBioProps } from "./HeaderWithBio";
import Bio, { BioProps } from "./Bio";

type ModalContextType = {
  showModal: (content: ReactNode) => void;
  isBackgroundClosable: React.Dispatch<SetStateAction<boolean>>;
  onClose: boolean;
  close: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = (): ModalContextType => {
  const context = use(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

type ModalProviderProps = {} & PropsWithChildren;

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modal, setModal] = useState<ReactNode | null>(null);
  const [backgroundClosable, setBackgroundClosable] = useState<boolean>(true);
  const [onClose, setOnClose] = useState(false);

  const close = useCallback(() => {
    setModal(null);
    setOnClose(true);
  }, []);

  const showModal = (content: ReactNode) => {
    setModal(content);
  };

  return (
    <ModalContext
      value={{
        showModal,
        isBackgroundClosable: setBackgroundClosable,
        onClose,
        close,
      }}
    >
      {children}
      {modal && (
        <div
          onClick={() => backgroundClosable && setModal(null)}
          className="fixed inset-0 flex h-screen w-full bg-black/90"
        >
          <div
            className="flex-1 md:place-items-center md:self-center"
            onClick={(e) => e.stopPropagation()}
          >
            {modal}
          </div>
        </div>
      )}
    </ModalContext>
  );
};

export default ModalProvider;

type ModalProps = {
  title?: ReactNode;
  description?: ReactNode;
  content?: ReactNode;
  controls?: ReactNode;
} & PropsWithChildren &
  Pick<HTMLAttributes<HTMLDivElement>, "className">;

export const Modal = ({
  title,
  description,
  content,
  controls,
  className,
}: ModalProps) => {
  const { close } = useModal();

  return (
    <div className="relative h-full w-full md:h-[600px] md:w-[500px]">
      <div className="absolute inset-0 hidden rounded-2xl bg-white/20 blur-xl md:block"></div>
      <div
        className={cn(
          "bg-background text-foreground relative flex h-full w-full flex-col border-white/20 px-5 pt-10 pb-6 md:rounded-3xl md:border",
          className,
        )}
      >
        <div className="mt-5 md:mt-0">{title}</div>
        {description}
        {content && <div className="mt-6 flex-1">{content}</div>}
        {controls && <div className="w-full">{controls}</div>}

        {/* close btn   */}
        <button onClick={close} className="absolute top-5 right-3">
          <X size={30} className="text-white/50" />
        </button>
      </div>
    </div>
  );
};

type ModalTitleProps = {} & PropsWithChildren &
  Pick<HTMLAttributes<HTMLDivElement>, "className">;

Modal.Title = ({ children, className }: ModalTitleProps) => {
  return (
    <h1
      className={cn(
        "text-foreground text-2xl font-medium md:font-semibold",
        className,
      )}
    >
      {children}
    </h1>
  );
};

type ModalDescriptionProps = {} & PropsWithChildren;

Modal.Description = ({ children, className }: BioProps) => {
  return <Bio className={className}>{children}</Bio>;
};

type ModalControlsProps = { aboveText?: string } & PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement>;

Modal.Controls = ({
  children,
  onClick,
  aboveText,
  className,
  ...buttonProps
}: ModalControlsProps) => {
  return (
    <div className="flex w-full flex-col gap-3">
      {aboveText && (
        <div className="flex gap-1">
          <InfoSvg className="fill-surface/50" size={15} />
          <span className="text-secondary text-xs wrap-break-word hyphens-auto">
            {aboveText}
          </span>
        </div>
      )}
      <Button
        className={cn("h-[52px] w-full", className)}
        onClick={onClick}
        {...buttonProps}
      >
        {children}
      </Button>
    </div>
  );
};

type ModalContentProps = {} & PropsWithChildren;

Modal.Content = ({ children }: ModalContentProps) => {
  return children;
};

Modal.TitleWithBio = ({ title, bio, className }: TitleWithBioProps) => {
  return <TitleWithBio bio={bio} className={className} title={title} />;
};
