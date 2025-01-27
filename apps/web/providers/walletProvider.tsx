"use client";

import { useMantineColorScheme } from "@mantine/core";
import {
    RainbowKitProvider,
    darkTheme,
    getDefaultConfig,
    lightTheme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
    arbitrum,
    arbitrumSepolia,
    base,
    baseSepolia,
    foundry,
    mainnet,
    optimism,
    optimismSepolia,
    sepolia,
} from "viem/chains";
import { defineChain } from "viem";
import { WagmiProvider } from "wagmi";

const projectId = "bc37f90dfcefc2900e5a86d366bf9aea";
const queryClient = new QueryClient();

export const besu = defineChain({
    id: 31337,
    name: 'Besu',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
    },
    rpcUrls: {
      default: {
        http: ['http://localhost:8545'],
        webSocket: ['wss://localhost:8546'],
      },
    },
    blockExplorers: {
      default: { name: 'Besu Explorer', url: 'http://localhost' },
    },
})

const config = getDefaultConfig({
    appName: "Sunodo",
    projectId,
    chains:
        process.env.NODE_ENV === "development"
            ? [
                  besu,
                  mainnet,
                  sepolia,
                  arbitrum,
                  arbitrumSepolia,
                  optimism,
                  optimismSepolia,
                  base,
                  baseSepolia,
                  foundry,
              ]
            : [
                  besu,
                  mainnet,
                  sepolia,
                  arbitrum,
                  arbitrumSepolia,
                  optimism,
                  optimismSepolia,
                  base,
                  baseSepolia,
              ],
    ssr: true,
});

const WalletProvider = ({ children }: { children: React.ReactNode }) => {
    const scheme = useMantineColorScheme();
    const walletTheme =
        scheme.colorScheme == "dark" ? darkTheme() : lightTheme();

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={walletTheme}>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};

export default WalletProvider;
