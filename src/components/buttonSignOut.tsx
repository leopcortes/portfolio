"use client";
import { signOut } from "next-auth/react";
import { Button } from "~/components/ui/button";
export function ButtonSignOut() {
  return (
    <Button
      onClick={() => signOut()}
      className="text-xls rounded-md border-2 px-4 transition duration-200 ease-linear"
    >
      Sair
    </Button>
  );
}
