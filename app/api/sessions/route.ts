import { NextResponse } from 'next/server';

const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL || "http://yamanote.proxy.rlwy.net:17090";

export async function GET() {
  try {
    const response = await fetch(`${WHATSAPP_API_URL}/sessions`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      return NextResponse.json(
        { 
          status: "error", 
          message: `Upstream API error: ${response.statusText}` 
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch sessions";
    return NextResponse.json(
      { status: "error", message },
      { status: 500 }
    );
  }
}
