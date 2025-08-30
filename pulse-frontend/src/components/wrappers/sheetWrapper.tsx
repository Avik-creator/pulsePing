import type React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface SheetWrapperProps {
  title: string;
  description: string;
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const SheetWrapper = ({
  isOpen,
  handleClose,
  children,
  title,
  description,
}: SheetWrapperProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="flex flex-col pb-0 overflow-y-auto no-scrollbar">
        <SheetHeader>
          <SheetTitle className="text-2xl">{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        {children}
      </SheetContent>
    </Sheet>
  );
};

export default SheetWrapper;
