import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";

import abi from "../../../truffle/abis/smartSAFTAgreement.json";

const docMapper = {
  SAFT: process.env.CONTRACT_ADDRESS_SAFT,
  SAFE: process.env.CONTRACT_ADDRESS_SAFE,
  NDA: process.env.CONTRACT_ADDRESS_NDA,
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { slug, address } = req.query;
  const docType = slug?.toString().toUpperCase() || "SAFT";
  const contractAddress = docMapper[docType as keyof typeof docMapper] as string;
  console.log(contractAddress);
  console.log(address);

  const provider = new ethers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com");

  const contract = new ethers.Contract(contractAddress, abi, provider);
  contract
    .ownedTokenIds(address, 1)
    .then((result) => {
      return res.status(200).json({ result });
    })
    .catch((error) => {
      console.log(error);
      return res.status(404).send("BAD");
    });
};

export default handler;
