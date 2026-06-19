import { notFound, redirect } from "next/navigation";
import { getAccountSummaryAction } from "@/actions/lostx/user-profile.actions";
import { AccountPageContent } from "@/components/users/AccountPageContent";

export default async function AccountPage() {
  const result = await getAccountSummaryAction();
  if (!result.success || !result.data) {
    redirect("/login");
  }

  return <AccountPageContent summary={result.data} />;
}
