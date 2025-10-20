export const runtime = "edge";

export async function GET() {
  const isDebug = process.env.DEBUG === "true";

  return new Response(JSON.stringify({ debug: isDebug }), {
    headers: { "Content-Type": "application/json" },
  });
}
