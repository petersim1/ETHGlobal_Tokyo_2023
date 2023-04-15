import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";

import abi from "../../abi";

const docMapper = {
  SAFT: process.env.CONTRACT_ADDRESS_SAFT,
  SAFE: process.env.CONTRACT_ADDRESS_SAFE,
  NDA: process.env.CONTRACT_ADDRESS_NDA,
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { slug, address } = req.query;
  const docType = slug?.toString().toUpperCase() || "SAFT";
  const contractAddress = docMapper[docType as keyof typeof docMapper] as string;

  const provider = new ethers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com");

  const contract = new ethers.Contract(contractAddress, abi, provider);
  contract.balanceOf(address).then((result) => {
    return res.status(200).json({ result });
  });
};

export default handler;
