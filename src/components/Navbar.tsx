"use client";
import Link from "next/link";
import { Menu, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./toggle-mode";
import React from "react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between p-2 bg-background border-b">
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground hover:bg-secondary"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Link href="/" className="font-semibold text-lg text-foreground">
          ChatGPT
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="flex items-center space-x-2 text-sm font-medium bg-background hover:bg-secondary border-muted-foreground/20"
          onClick={(e) => {
            e.preventDefault();
            window.location.reload();
          }}
        >
          <Plus className="h-4 w-4" />
          <span>New chat</span>
        </Button>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
