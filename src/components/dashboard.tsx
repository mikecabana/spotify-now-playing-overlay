import { Session } from "next-auth";
import { headers as nextHeaders } from "next/headers";
import { UrlBuilder } from "./url-builder";

type DashboardProps = { domain: string; session: Session };

export async function Dashboard({ domain, session }: DashboardProps) {
  const headers = await nextHeaders();
  const reqUrl = headers.get("referer");

  let scheme: "https" | "http" = "http";

  if (reqUrl) {
    const url = new URL(reqUrl);
    scheme = url.protocol === "https:" ? "https" : "http";
  }

  return (
    <div>
      <UrlBuilder domain={domain} session={session} scheme={scheme} />
    </div>
  );
}
