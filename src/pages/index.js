import LiveBackground from "@/components/Common/LiveBackground";
import Toggle from "@/components/Common/Toggle";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4">
      <LiveBackground />
    </div>
  );
}
