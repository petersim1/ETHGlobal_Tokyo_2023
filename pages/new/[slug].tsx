import { useEffect, useState } from "react";
import type { GetServerSideProps } from "next";

import EditPanel from "@/components/Document/EditPanel";
import DocumentGrid from "@/components/Document/DocumentGrid";
import Document from "@/components/Document/Document";
import { DocumentConstantI } from "../../types/documents";
import { getDocMapping } from "../../utils/helpers";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let { slug } = context.query;
  if (!slug) slug = "SAFT";

  const documentUse = getDocMapping(slug as string);

  return {
    props: {
      ...documentUse,
    },
  };
};

const Page = ({
  docUse,
  docEditInit,
  docEditBool,
  docEditFields,
}: {
  docUse: DocumentConstantI[];
  docEditInit: any;
  docEditBool: any;
  docEditFields: any;
}): JSX.Element => {
  const [fields, setFields] = useState({ ...docEditInit });
  const [tried, setTried] = useState({ ...docEditBool });
  const [valid, setValid] = useState({ ...docEditBool });
  const [active, setActive] = useState({ ...docEditBool });

  useEffect(() => {
    setTried({ ...docEditBool });
    setValid({ ...docEditBool });
    setFields({ ...docEditInit });
    setActive({ ...docEditBool });
  }, []);

  return (
    <DocumentGrid>
      <Document
        doc={docUse}
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
        placeholderObj={docEditFields}
      />
    </DocumentGrid>
  );
};

export default Page;
