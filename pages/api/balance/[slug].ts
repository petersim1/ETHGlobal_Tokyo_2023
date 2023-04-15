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

  const provider = new ethers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com");

  const contract = new ethers.Contract(contractAddress, abi, provider);
  return contract
    .getOwnedTokenIds(address)
    .then((tokenIds) => {
      console.log(tokenIds);
      return Promise.all(
        tokenIds.map((tokenId: string) => {
          return contract.tokenContracts(tokenId);
        }),
      );
    })
    .then((tokens) => {
      return res.status(200).json({ tokens });
    })
    .catch((error) => {
      console.log(error);
      return res.status(404).send("BAD");
    });
};

export default handler;
