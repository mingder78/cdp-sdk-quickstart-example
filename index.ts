#!/usr/bin/env node
import { http, createPublicClient, parseEther } from "viem";
import { baseSepolia } from "viem/chains";
import { CdpClient } from "@coinbase/cdp-sdk";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { homedir } from "os";
import { join } from "path";
import { readdir, readFile, stat } from "fs/promises";
import dotenv from "dotenv";
import { createWalletClient, type Hex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { Coinbase, Wallet } from "@coinbase/coinbase-sdk";

await Coinbase.configureFromJson({ filePath: "/tmp/cdp_api_key.json" });


dotenv.config();
// Setup signer
const signer = privateKeyToAccount(process.env.YOUR_PRIVATE_KEY as Hex);

// Init CDP client
const cdp = new CdpClient({
});

// Create a wallet client for signing
const walletClient = createWalletClient({
  account: signer,
  chain: baseSepolia,
  transport: http(),
});

const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

console.log(cdp)

const main = async () => {
// 🪪 Create account
const account = await cdp.evm.createAccount();
console.log("✅ Created EVM account:", account.address);

// 💧 Faucet
const { transactionHash: faucetTx } = await cdp.evm.requestFaucet({
  address: account.address,
  network: "base-sepolia",
  token: "eth",
});
await publicClient.waitForTransactionReceipt({ hash: faucetTx });
console.log("🚰 Received testnet ETH:", faucetTx);

// 🧾 Send tx
const { transactionHash } = await cdp.evm.sendTransaction({
  address: account.address,
  network: "base-sepolia",
  transaction: {
    to: "0x06159453E00a00C05E15E5268355bbBf83d75948",
    value: parseEther("0.0000999"),
  },
});
await publicClient.waitForTransactionReceipt({ hash: transactionHash });
console.log(`📦 TX confirmed: https://sepolia.basescan.org/tx/${transactionHash}`);
}


function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function withRetry(fn: () => Promise<any>) {
   let delay = 1000;
   while (true) {
      try {
      return await fn();
      } catch (e) {
      if (e.errorType === "rate_limit_exceeded") {
        await sleep(delay); // wait before retrying
        delay *= 2; // increase delay each time
        continue;
       }
      throw e;
      }
   }
}

main()
