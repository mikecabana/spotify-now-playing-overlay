import { Session } from "next-auth";
import { headers as nextHeaders } from "next/headers";
import { UrlBuilder } from "./url-builder";

type DashboardProps = { domain: string; session: Session };

export async function Dashboard({ domain, session }: DashboardProps) {
  const headers = await nextHeaders();
  const schemeHeader = headers.get(":scheme:");
  const refererHeader = headers.get("referer");

  let scheme: "https" | "http" = "http";

  if (refererHeader) {
    const url = new URL(refererHeader);
    scheme = url.protocol === "https:" ? "https" : "http";
  }

  if (schemeHeader) {
    scheme = schemeHeader as "https" | "http";
  }

  return (
    <div>
      <UrlBuilder domain={domain} session={session} scheme={scheme} />
    </div>
  );
}
