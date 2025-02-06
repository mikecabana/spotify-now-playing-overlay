"use client";

import { encodeEmail } from "@/lib/utils";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type UrlBuilderProps = {
  domain: string;
  session: Session;
  scheme: "http" | "https";
};

export function UrlBuilder({ domain, session, scheme }: UrlBuilderProps) {
  const [id] = useState<string>(encodeEmail(session.user?.email ?? ""));
  const [rounded, setRounded] = useState<"true" | "false">("false");
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [text, setText] = useState<string>("");
  const [color, setColor] = useState<string>("#000000");
  const [border, setBorder] = useState<string>("#000000");
  const [url, setUrl] = useState<string | undefined>(undefined);
  const sizeOptions = ["sm", "md", "lg"];

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.set("id", id);
    if (size !== "md") {
      searchParams.set("size", size);
    }
    if (color.length > 0) {
      searchParams.set("color", color);
    }
    if (border.length > 0) {
      searchParams.set("border", border);
    }
    if (text.length > 0) {
      searchParams.set("text", text);
    }
    if (rounded === "true") {
      searchParams.set("rounded", "true");
    }

    const url = `${scheme}://${domain}/${id}?${searchParams.toString()}`;
    setUrl(url);
  }, [size, color, border, text, rounded]);

  const copyUrl = () => {
    navigator.clipboard.writeText(url ?? "");
    toast("Copied!");
  };

  return (
    <>
      <div className="grid gap-2">
        <div className="grid grid-cols-6">
          <div className="col-span-5 py-2">size</div>
          <div className="col-span-1 flex items-center justify-end">
            <select
              className="w-full px-4 py-2 text-right bg-background border border-zinc-800 rounded-lg text-xs"
              value={size}
              onChange={(e) => setSize(e.target.value as "sm" | "md" | "lg")}
            >
              {sizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-6">
          <div className="col-span-3 py-2">text</div>
          <div className="col-span-3 text-right flex items-center justify-end gap-2">
            {text && (
              <button
                className="text-xs hover:text-spotify transition duration-200"
                onClick={() => setText("")}
              >
                clear
              </button>
            )}
            <input
              className="h-8 w-10 text-right bg-background overflow-hidden rounded-lg text-xs"
              type="color"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-6">
          <div className="col-span-3 py-2">color</div>
          <div className="col-span-3 text-right flex items-center justify-end gap-2">
            {color && (
              <button
                className="text-xs hover:text-spotify transition duration-200"
                onClick={() => setColor("")}
              >
                clear
              </button>
            )}
            <input
              className="h-8 w-10 text-right bg-background overflow-hidden rounded-lg text-xs"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-6">
          <div className="col-span-3 py-2">border</div>
          <div className="col-span-3 text-right flex items-center justify-end gap-2">
            {border && (
              <button
                className="text-xs hover:text-spotify transition duration-200"
                onClick={() => setBorder("")}
              >
                clear
              </button>
            )}
            <input
              className="h-8 w-10 text-right bg-background overflow-hidden rounded-lg text-xs"
              type="color"
              value={border}
              onChange={(e) => setBorder(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-6">
          <div className="col-span-2 py-2">rounded</div>
          <div className="col-span-4 flex items-center justify-end">
            <input
              className="h-5 w-5 bg-background border-zinc-800 rounded-lg text-background"
              type="checkbox"
              checked={rounded === "true"}
              onChange={(e) => setRounded(e.target.checked ? "true" : "false")}
            />
          </div>
        </div>
        <div>
          <pre className="relative text-zinc-400 whitespace-pre-wrap break-all w-full border border-zinc-800 p-8 pb-10 rounded-lg">
            <div className="absolute bottom-0 right-0 text-xs text-zinc-400 border border-zinc-800 p-1 rounded-tl-lg">
              <button
                onClick={copyUrl}
                className="hover:opacity-50 active:opacity-30"
              >
                copy
              </button>
            </div>
            {url}
          </pre>
        </div>
        <div className=" pt-8 pb-2 text-center">
          <div className="uppercase font-bold text-spotify mb-1">Preview</div>
          <div className="text-sm text-zinc-400">
            Listen to something on Spotify to see it here
          </div>
        </div>
        <div className="h-48 flex items-stretch justify-center">
          <iframe
            className="flex-grow"
            src={url}
            style={{ backgroundColor: "transparent" }}
          ></iframe>
        </div>
      </div>
    </>
  );
}
