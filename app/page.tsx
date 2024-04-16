import type { Metadata } from "next";
import { Home } from "./home/Home";

export default function IndexPage() {
  return (
      <Home />
  );
}

export const metadata: Metadata = {
  title: "BlazeSoft",
};
