"use client";

import * as React from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import { trustWallet, ledgerWallet } from "@rainbow-me/rainbowkit/wallets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, http } from "wagmi";

const { wallets } = getDefaultWallets();

const movement = {
  id: 30732, 
  name: "Movement",
  network: "movement",
  nativeCurrency: {
    name: "Movement",
    symbol: "MOVE",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://mevm.devnet.imola.movementlabs.xyz"],
    },
    public: {
      http: ["https://mevm.devnet.imola.movementlabs.xyz"],
    },
  },
  blockExplorers: {
    default: { name: "MovementScan", url: "https://explorer.devnet.imola.movementlabs.xyz/" },
  },
  testnet: false,
};

const config = getDefaultConfig({
  appName: "DApp Bootcamp Frontends",
  projectId: "b735f0d8b8e242fb3e26f7c8dd1062b1",
  wallets: [
    ...wallets,
    {
      groupName: "Other",
      wallets: [trustWallet, ledgerWallet],
    },
  ],
  chains: [movement],
  transports: {
    [30732]: http("https://mevm.devnet.imola.movementlabs.xyz"),
  },
  ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
