import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"
import React from "react";

interface DropProps {
    title?: string;
    buttonTitle?: React.ReactNode,
    childrens?: React.ReactNode;
}
export function DropdownMenuDemoAdmin(
    {
        title,
        childrens,
        buttonTitle,
    } : DropProps
) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border border-none bg-white">{ buttonTitle || <MoreVertical />} </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto p-3">
                <DropdownMenuLabel>{title}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                    {childrens}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
