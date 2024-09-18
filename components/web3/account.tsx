"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { mainnet } from "viem/chains";
import { useAccount, useBalance, useEnsAvatar, useEnsName } from "wagmi";

export const Account = () => {
  const [isMounted, setIsMounted] = useState(false);

  const { address, chainId, chain, isConnected } = useAccount();

  const { data, isLoading } = useBalance({
    address,
  });

  const { data: ensName } = useEnsName({
    address,
    chainId: mainnet.id,
  });

  const { data: ensAvatar } = useEnsAvatar({
    name: ensName!,
    chainId: mainnet.id,
  });

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, [isMounted]);

  if (!isConnected) {
    return (
      <div>
        <p className="text-lg">Not connected</p>
      </div>
    );
  }

  console.log(ensName, ensAvatar)

  return (
    <div className="flex flex-col items-center text-center gap-y-4">
      {ensAvatar && ensName && isMounted && (
        <div className="flex items-center gap-x-2">
          <Image
            src={ensAvatar}
            alt={ensName}
            className="h-16 w-16 rounded-full"
            width={64}
            height={64}
          />
          {ensName && <p className="text-2xl text-black">{ensName}</p>}
        </div>
      )}
      {address && isMounted && <p className="text-lg text-black">{address}</p>}

      {data && !isLoading && (
          <p className="text-xl text-black">
            Balance: {data?.formatted} {data?.symbol}
          </p>
        )}
        {chain && chainId && isMounted && (
          <p className="text-black">
            {chain.name}, Chain ID: {chainId}
          </p>
        )}
    </div>
  );
};
