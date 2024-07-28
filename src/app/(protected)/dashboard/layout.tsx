import { Sidebar } from "@/components/admin/sidebar/sidebar";
import { currentUser } from "@/lib/auth";
import Core from "./_components/core";
import ModalProvider from "@/providers/modal-provider";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { entrepriseId: string };
}) {
  const user = await currentUser();
  const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "App";

  return (
    <>
      <ModalProvider>
        <Sidebar appName={appName} />
        <Core>{children}</Core>
      </ModalProvider>
    </>
  );
}
