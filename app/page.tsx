"use client";

import { ConnectKitButton } from "connectkit";
import { Account } from "@/components/web3/account";

export default function Home() {
  return (
    <div className="h-[100vh] bg-white">
        <div className="container md:pt-4 lg:pt-12 xl:pt-20">
          <h1 className="mb-4 text-6xl text-black text-center">React to Web3 Bootcamp</h1>
          <div className="py-8 w-full flex flex-col items-center gap-y-4">
            <ConnectKitButton />
            <Account />
          </div>
        </div>
      </div>
  );
}
