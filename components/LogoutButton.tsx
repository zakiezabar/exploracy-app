"use client";

import { signOut } from "next-auth/react";
import Button from "@/components/Button";

const LogoutButton: React.FC = () => {
  return (
    <Button
      outline
      small
      onClick={() => signOut({ callbackUrl: "/" })}
      label="Logout"
    />
  );
};

export default LogoutButton;
