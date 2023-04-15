import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { slug, address } = req.query;
  const docType = slug?.toString().toUpperCase();
  let contractAddress = "";

  const provider = new ethers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com");
  switch (docType) {
    case "SAFT":
      contractAddress = process.env.CONTRACT_ADDRESS || "";
      console.log(contractAddress);
      provider.getBlockNumber().then((result) => {
        console.log("Current block number: " + result);
        return res.status(200).json({ result });
      });
  }
};

export default handler;
