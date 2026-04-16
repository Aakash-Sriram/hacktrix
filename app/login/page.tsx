import type { Metadata } from "next";

import { LoginPage } from "@/features/auth";

export const metadata: Metadata = {
  title: "Login | Mission Saver",
};

export default function LoginRoute() {
  return <LoginPage />;
}
