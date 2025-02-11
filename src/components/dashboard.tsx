import { Session } from "next-auth";
import { UrlBuilder } from "./url-builder";

type DashboardProps = { domain: string; session: Session };

export async function Dashboard({ domain, session }: DashboardProps) {
  const scheme: "https" | "http" =
    process.env.VERCEL_ENV === "production" ? "https" : "http";

  return (
    <div>
      <UrlBuilder domain={domain} session={session} scheme={scheme} />
    </div>
  );
}
