import { SiBluesky, SiGithub, SiThreads } from "@icons-pack/react-simple-icons";
import { Btn } from "./btn";

export function Footer() {
  return (
    <footer className="w-full max-w-md min-h-full py-20 px-4">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Btn
          href="https://github.com/mikecabana/spotify-now-playing-overlay"
          target="_blank"
        >
          <SiGithub className="w-5 h-5" />
        </Btn>
        <Btn href="https://threads.net/@mikecabana" target="_blank">
          <SiThreads className="w-5 h-5" />
        </Btn>
        <Btn href="https://bsky.app/profile/mikecabana.com" target="_blank">
          <SiBluesky className="w-5 h-5" />
        </Btn>
      </div>
      <p className="mb-2 text-center">
        built by{" "}
        <a
          href="https://mikecabana.com"
          target="_blank"
          rel="noopener"
          className="text-spotify hover:underline"
        >
          Mikey{" "}
        </a>
        &copy; {new Date().getFullYear()}
      </p>
      <p className="text-sm flex items-center justify-center">
        <Btn href="/privacy-policy">Privacy Policy</Btn>
      </p>
    </footer>
  );
}
