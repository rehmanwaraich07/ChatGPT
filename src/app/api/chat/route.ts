import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
  });

  return new Response(
    JSON.stringify({ content: response.choices[0]?.message?.content || "" }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
