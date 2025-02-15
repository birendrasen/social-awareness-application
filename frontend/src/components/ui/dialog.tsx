// src/components/ui/dialog.tsx
import * as React from "react";

// DialogContainerProps interface
interface DialogContainerProps {
  children: React.ReactNode;
}

// Dialog component, forwardRef for reference management
const Dialog = React.forwardRef<HTMLDivElement, DialogContainerProps>(({ children }, ref) => {
  return (
    <div ref={ref} className="dialog">
      {children}
    </div>
  );
});

Dialog.displayName = "Dialog";

// DialogTriggerProps interface
interface DialogTriggerProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

// DialogTrigger component for opening the dialog
const DialogTrigger: React.FC<DialogTriggerProps> = ({ children, onClick }) => {
  return (
    <button className="dialog-trigger" onClick={onClick}>
      {children}
    </button>
  );
};

DialogTrigger.displayName = "DialogTrigger";

// DialogContentProps interface
interface DialogContentProps {
  children: React.ReactNode;
}

// DialogContent component for the dialog's content
const DialogContent: React.FC<DialogContentProps> = ({ children }) => {
  return <div className="dialog-content">{children}</div>;
};

DialogContent.displayName = "DialogContent";

// DialogHeaderProps interface
interface DialogHeaderProps {
  children: React.ReactNode;
}

// DialogHeader component for the dialog's header
const DialogHeader: React.FC<DialogHeaderProps> = ({ children }) => {
  return <div className="dialog-header">{children}</div>;
};

DialogHeader.displayName = "DialogHeader";

// DialogTitleProps interface
interface DialogTitleProps {
  children: React.ReactNode;
}

// DialogTitle component for the dialog's title
const DialogTitle: React.FC<DialogTitleProps> = ({ children }) => {
  return <h2 className="dialog-title">{children}</h2>;
};

DialogTitle.displayName = "DialogTitle";

// DialogDescriptionProps interface
interface DialogDescriptionProps {
  children: React.ReactNode;
}

// DialogDescription component for the dialog's description
const DialogDescription: React.FC<DialogDescriptionProps> = ({ children }) => {
  return <p className="dialog-description">{children}</p>;
};

DialogDescription.displayName = "DialogDescription";

// Export all dialog components
export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription };
