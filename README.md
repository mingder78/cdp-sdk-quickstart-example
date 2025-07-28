# dev

```sh
bun i
bun run build
bun start
```

## demo

```
$ bun run build &&  bun start
$ tsc
$ node dist/index.js
[dotenv@17.2.1] injecting env (4) from .env -- tip: 🛠️  run anywhere with `dotenvx run -- yourcommand`
CdpClient {
  evm: EvmClient {},
  solana: SolanaClient {},
  policies: PoliciesClient {}
}
✅ Created EVM account: 0x50b9dE5Ee968a24F1Ef16DA05749435C41C07e4E
🚰 Received testnet ETH: 0x0daf5512f00d5b3d359fbb37b709c17d05e7cefff9ea68e024be22cf85fe6a4c
📦 TX confirmed: https://sepolia.basescan.org/tx/0x40503308537e699f89b67be1866293db92496f093c97fccf411b83a58aff6c9b
```


# cdp-quickstart

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run dist/index.js
```

This project was created using `bun init` in bun v1.1.20. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
