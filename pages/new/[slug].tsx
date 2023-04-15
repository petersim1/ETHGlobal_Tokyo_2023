import { useState } from "react";
import type { GetServerSideProps } from "next";

import EditPanel from "@/components/Document/EditPanel";
import DocumentGrid from "@/components/Document/DocumentGrid";
import Document from "@/components/Document/Document";
import { docEditInitialState, docEditInitialStateBool } from "../../constants/initStates";
import { DocumentConstantI } from "../../types/documents";
import { getDocMapping } from "../../utils/helpers";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let { doc } = context.query;
  if (!doc) doc = "SAFT";

  const documentUse = getDocMapping(doc as string);

  return {
    props: {
      documentUse,
    },
  };
};

const Page = ({ documentUse }: { documentUse: DocumentConstantI[] }): JSX.Element => {
  const [fields, setFields] = useState({ ...docEditInitialState });
  const [tried, setTried] = useState({ ...docEditInitialStateBool });
  const [valid, setValid] = useState({ ...docEditInitialStateBool });
  const [active, setActive] = useState({ ...docEditInitialStateBool });

  return (
    <DocumentGrid>
      <Document
        doc={documentUse}
        fields={fields}
        tried={tried}
        valid={valid}
        active={active}
        edit={true}
      />
      <EditPanel
        setFields={setFields}
        setTried={setTried}
        setValid={setValid}
        setActive={setActive}
        tried={tried}
        fields={fields}
        valid={valid}
      />
    </DocumentGrid>
  );
};

export default Page;
