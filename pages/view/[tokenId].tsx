import type { GetServerSideProps } from "next";

import DocumentGrid from "../../components/Document/DocumentGrid";
import Document from "../../components/Document/Document";
import ViewPanel from "../../components/Document/ViewPanel";
import { ViewDocI } from "../../types/documents";
import { getDocMapping } from "../../utils/helpers";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;

  if (!slug) {
    return {
      redirect: {
        destination: "/docs",
        permanent: true,
      },
    };
  }

  const docInfo = await getDocument(slug as string);
  if (!docInfo) {
    return {
      redirect: {
        destination: "/docs",
        permanent: true,
      },
    };
  }

  const documentUse = getDocMapping(docInfo.type);

  return {
    props: {
      documentUse,
      tokenId: slug as string,
      docInfo: {
        title: docInfo.title,
        type: docInfo.type,
        disclosing_party: docInfo.name.disclosing,
        receiving_party: docInfo.name.receiving,
        disclosing_wallet: docInfo.wallet.disclosing,
        receiving_wallet: docInfo.wallet.receiving,
        nft_txn: docInfo.nft.txn,
      },
      signedInfo: {
        disclosing: docInfo.signed.disclosing,
        receiving: docInfo.signed.receiving,
      },
      timeInfo: {
        created: docInfo.timestamp.created,
        disclosing: docInfo.timestamp.disclosing,
        receiving: docInfo.timestamp.receiving,
      },
    },
  };
};

const ViewDoc = ({
  tokenId,
  documentUse,
  docInfo,
  signedInfo,
  timeInfo,
}: ViewDocI): JSX.Element => {
  return (
    <DocumentGrid>
      <Document doc={documentUse} fields={docInfo} edit={false} />
      <ViewPanel docInfo={docInfo} signedInfo={signedInfo} timeInfo={timeInfo} tokenId={tokenId} />
    </DocumentGrid>
  );
};

export default ViewDoc;
