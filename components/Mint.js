import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useAccount, useContract, useSigner, useNetwork } from "wagmi";

const Mint = () => {
  const { isConnected, address} = useAccount();
  const { data: signer } = useSigner();
  const contractAddress = "0x479efd2af75ffea784e6d97f34d65d3ac4617f57";
  const contractAbi = require("../contract/abi.json");
  const [minting, setMinting] = useState(false);

  const contract = useContract({
    address: contractAddress,
    abi: contractAbi,
    signerOrProvider: signer,
  })

  const mint = async () => {
    setMinting(true);
    const tx = await contract.safeMint(address);
    await tx.wait();
    setMinting(false);
  };

  return (
    <div className="bg-[#1A0E35]">
      <div className="m-auto">
        <h1 className="text-center text-2xl mb-3 py-5 uppercase tracking-wider text-[#7758F2] animate__animated animate__bounce">
          Doggie Minter
        </h1>
        <div className="flex justify-center">
          <div>
            <div className="animate__animated animate__rubberBand">
              {" "}
              <Image
                src="/golden.jpg"
                alt="pexels"
                width={300}
                height={300}
                className="rounded-xl"
                priority="true"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => mint()}
              disabled={!isConnected || minting}
              className="w-full py-4 mt-4 mb-6 text-white bg-gray-400 border border-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10"
            >
              <span className="text-xl tracking-widest uppercase"> Mint</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mint;
