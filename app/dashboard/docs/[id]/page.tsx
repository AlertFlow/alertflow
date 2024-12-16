import { Divider, Spacer } from "@nextui-org/react";

import DocContent from "@/components/dashboard/docs/doc/content";
import DocHeader from "@/components/dashboard/docs/doc/header";
import GetDoc from "@/lib/fetch/docs/doc";
import GetUserDetails from "@/lib/fetch/user/getDetails";
import ErrorCard from "@/components/error/ErrorCard";

export default async function DocPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const docData = GetDoc(id);
  const userDetailsData = GetUserDetails();

  const [doc, userDetails] = (await Promise.all([
    docData,
    userDetailsData,
  ])) as any;

  return (
    <main>
      {doc.success && userDetails.success ? (
        <>
          <DocHeader doc={doc.data.doc} user={userDetails.data.user} />
          <Spacer y={2} />
          <Divider className="mb-4" />
          <DocContent doc={doc.data.doc} />
        </>
      ) : (
        <ErrorCard
          error={doc.error || userDetails.error}
          message={doc.message || userDetails.message}
        />
      )}
    </main>
  );
}
