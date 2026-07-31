import { NextResponse } from "next/server";
import { currentUserId } from "@/auth";
import { unauthorized } from "@/lib/server/http";
import { getSendaTestStatus } from "@/lib/server/sendaTestService";

export const dynamic = "force-dynamic";

export async function GET() {
  const userId = await currentUserId();
  if (!userId) {
    return unauthorized();
  }
  return NextResponse.json(await getSendaTestStatus(userId));
}
