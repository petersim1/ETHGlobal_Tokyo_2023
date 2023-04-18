import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";

import abi from "../../../truffle/abis/smartSAFTAgreement.json";

const docMapper = {
  SAFT: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_SAFT,
  SAFE: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_SAFE,
  NDA: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_NDA,
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { slug, address } = req.query;
  const docType = slug?.toString().toUpperCase() || "SAFT";
  const contractAddress = docMapper[docType as keyof typeof docMapper] as string;

  const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com");

  const contract = new ethers.Contract(contractAddress, abi, provider);
  return contract
    .getOwnedTokenIds(address)
    .then((tokenIds: string[]) => {
      return Promise.all(
        tokenIds.map(async (tokenId: string) => {
          const parties = await contract.getPartiesInvolved(tokenId.toString());
          const states = await Promise.all(
            parties.map(async (party: string) => {
              return contract.getSigningState(tokenId.toString(), party);
            }),
          );
          return {
            tokenId: tokenId.toString(),
            docType: slug,
            address: {
              disclosing: parties[0],
              receiving: parties[1],
            },
            status: {
              disclosing: states[0],
              receiving: states[1],
            },
          };
        }),
      );
    })
    .then((tokens: any[]) => {
      return res.status(200).json({ tokens });
    })
    .catch((error: Error) => {
      console.log(error);
      return res.status(404).send("BAD");
    });
};

export default handler;
