import { NextRequest, NextResponse } from 'next/server';

const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL || "http://yamanote.proxy.rlwy.net:17090";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    
    if (!code) {
      return NextResponse.json(
        { status: "error", message: "Phone number code is required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${WHATSAPP_API_URL}/pair?code=${code}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (data.status === "error") {
      return NextResponse.json(data, { status: response.ok ? 200 : response.status });
    }

    if (!response.ok) {
      return NextResponse.json(
        { 
          status: "error", 
          message: `Upstream API error: ${response.statusText}` 
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error pairing:", error);
    const message = error instanceof Error ? error.message : "Failed to pair number";
    return NextResponse.json(
      { status: "error", message },
      { status: 500 }
    );
  }
}
