import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
("no-cache");
export async function POST(request) {
  const data = await request.json();
  const key = Object.keys(data)[0];
  const value = Object.values(data)[0];
  const didObj = {};
  didObj[key] = value;
  console.log(didObj);

  // get the data
  const dids = await kv.get("dids");

  console.log(dids, "the did");
  let newDids;

  // add the new did
  if (!dids) {
    newDids = didObj;
  } else {
    newDids = { ...didObj, ...dids };
    console.log(newDids, "the new");
  }

  // write the dids back to db
  const writeDids = await kv.set("dids", JSON.stringify(newDids));

  // if successfully written to db
  if (writeDids === "OK") {
    return NextResponse.json({ status: 1 });
  }

  return NextResponse.json({ status: 0 });
}

export async function GET() {
  // get the data
  const dids = await kv.get("dids");
  console.log(dids, "the dids");

  // if successfull
  if (dids) {
    return NextResponse.json({ status: 1, data: dids });
  }

  return NextResponse.json({ status: 0 });
}
