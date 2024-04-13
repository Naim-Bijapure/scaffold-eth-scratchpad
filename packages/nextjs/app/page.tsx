"use client";

import Link from "next/link";
import { FACTORY_ABI } from "./FACTORY_ABI";
import { Wallet } from "@ethersproject/wallet";
import type { NextPage } from "next";
// import { Client, Constants, Presets, UserOperationBuilder } from "userop";
import { V06 } from "userop";
import { createPublicClient, getContract, http } from "viem";
import { baseSepolia } from "viem/chains";
import { sepolia, useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { loadBurnerSK } from "~~/hooks/scaffold-eth";

const rpcUrl = "https://api.stackup.sh/v1/node/6e7365f0b818b4ff6d7d1a16d947ec46299e4fb584d9fa08dc8ecdb21d1232ac";
const paymasterUrl =
  "https://api.stackup.sh/v1/paymaster/6e7365f0b818b4ff6d7d1a16d947ec46299e4fb584d9fa08dc8ecdb21d1232ac"; // Optional - you can get one at https://app.stackup.sh/

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const pk = loadBurnerSK();
  console.log(`n-🔴 => pk:`, pk);

  const publicClient = createPublicClient({
    // chain: sepolia,
    chain: baseSepolia,
    transport: http(rpcUrl),
  });

  const factoryContract = getContract({
    address: process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS as string,
    abi: FACTORY_ABI,
    publicClient,
  });

  const onTest = async () => {
    try {
      factoryContract.address;
      // const keyId = "0x5666e2b9207d3d410917c1494a86cdf387b501faf46d20111a308a1740078970";

      // const user = await factoryContract.read.getUser([BigInt(keyId)]);
      // console.log(`n-🔴 => onTest => user:`, user);

      // const paymasterContext = { type: "payg" };
      // const paymasterMiddleware = Presets.Middleware.verifyingPaymaster(paymasterUrl, paymasterContext);
      // const opts = {
      //   paymasterMiddleware: paymasterMiddleware,
      // };
      // // Initialize the account
      // const signingKey = pk;
      // const signer = new Wallet(signingKey);
      // const builder = await Presets.Builder.SimpleAccount.init(signer, rpcUrl, opts);
      // const address = builder.getSender();
      // console.log(`Account address: ${address}`);

      // console.log(`n-🔴 => onTest => Constants.ERC4337.EntryPoint:`, Constants.ERC4337.EntryPoint);
      // v3 flow
      // const entryPoint = Constants.ERC4337.EntryPoint as string;
      // const client = await Client.init(rpcUrl, { entryPoint });
      // console.log(`n-🔴 => onTest => client:`, client);
      // const builder = new UserOperationBuilder().useDefaults({
      //   sender: "0x3D9BD660BEe8947fFb6840A482039e50D5327453",
      //   nonce: "0x1",
      //   initCode: "0x",
      //   callData:
      //     "0x34fcd5be00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000018216371e74c9f1820817131911c243241b56d25000000000000000000000000000000000000000000000000004961ab074f576500000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000",
      //   callGasLimit: "0x476e",
      //   verificationGasLimit: "0x127a99",
      //   preVerificationGas: "0x1a38f99a",
      //   maxFeePerGas: "0xf4398",
      //   maxPriorityFeePerGas: "0xf4240",
      //   paymasterAndData: "0x",
      //   signature:
      //     "0x01000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000017000000000000000000000000000000000000000000000000000000000000000124b6af842314f7b14a17b1fbcb3ab01d6d53017401e9b4de3a9dc0593ea62fc5aadb9c2caf0a1c3a74e3a8236980ed6e4875ef174b626b5df299fb5340d4d667000000000000000000000000000000000000000000000000000000000000002549960de5880e8c687434170f6476605b8fe4aeb9a28632c7995cf3ba831d97630500000003000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008f7b2274797065223a22776562617574686e2e676574222c226368616c6c656e6765223a224151414141414141414c54694c377a69327535726a49674f5f534e7738427467774e576f4242424239312d2d6d446a7371746e6e222c226f726967696e223a22687474703a2f2f6c6f63616c686f73743a33303030222c2263726f73734f726967696e223a66616c73657d0000000000000000000000000000000000",
      // });
      // const response = await client.sendUserOperation(builder);
      // const userOperationEvent = await response.wait();
      // console.log(`n-🔴 => onTest => userOperationEvent:`, userOperationEvent);

      const userOpHash = await V06.Bundler.SendUserOperationWithEthClient(
        {
          sender: "0x3D9BD660BEe8947fFb6840A482039e50D5327453",
          nonce: BigInt("0x2"),
          initCode: "0x",
          callData:
            "0x34fcd5be00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000018216371e74c9f1820817131911c243241b56d250000000000000000000000000000000000000000000000000068bceef4ef535200000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000",
          callGasLimit: BigInt("0x476e"),
          verificationGasLimit: BigInt("0x127a99"),
          preVerificationGas: BigInt("0x1c5cbcd4"),
          maxFeePerGas: BigInt("0xf4397"),
          maxPriorityFeePerGas: BigInt("0xf4240"),
          paymasterAndData: "0x",
          signature:
            "0x01000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000001700000000000000000000000000000000000000000000000000000000000000019f3858beea970e6e020e408f681cdf346849d33f74579f0e44051cbb12f75e91d417d9394adc3ead093de98871280961834d3857e3364b2f93451b6b45ace7e0000000000000000000000000000000000000000000000000000000000000002549960de5880e8c687434170f6476605b8fe4aeb9a28632c7995cf3ba831d97630500000004000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008f7b2274797065223a22776562617574686e2e676574222c226368616c6c656e6765223a224151414141414141414b4751634375425f693072345a67676c47536b5177706c74384443755876305958697a3156536b4a6b2d38222c226f726967696e223a22687474703a2f2f6c6f63616c686f73743a33303030222c2263726f73734f726967696e223a66616c73657d0000000000000000000000000000000000",
        },
        V06.EntryPoint.DEFAULT_ADDRESS,
        publicClient as any, // either viem PublicClient or ethers.js JsonRpcProvider
      );
      console.log(`n-🔴 => onTest => userOpHash:`, userOpHash);
    } catch (error) {
      console.log(`n-🔴 => onTest => error:`, error);
    }
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <button className="btn btn-primary" onClick={onTest}>
          test
        </button>
      </div>
    </>
  );
};

export default Home;
