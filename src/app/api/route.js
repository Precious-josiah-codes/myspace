import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

("no-cache");

export async function POST(request) {
  const data = await request.json();
  //   const dids = await kv.set(
  //     "dids",
  //     JSON.stringify({ ken: "dklsdk", jane: "sdklk" })
  //   );
  //   //   await kv.del("did");
  //   const session = await kv.get("dids");
  //   console.log("session", dids);
  return NextResponse.json({ data });
}
