"use client"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import React from "react";
import {Button} from "@/components/ui/button";



interface DialogProps {
    title?: string;
    description?: string;
    content?: React.ReactNode;
}


export function DialogCloseButton({
    title,
    description,

    content,
  }: DialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"destructive"}
                        size={"sm"}
                >
                    Suprimer
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    {/*content hier*/}
                    {content}
                </div>
            </DialogContent>
        </Dialog>
    )
}
