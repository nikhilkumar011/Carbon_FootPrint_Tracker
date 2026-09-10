import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const recommendationSchema = {
  type: "object",
  properties: {
    summary: { type: "string" },
    rating: {
      type: "string",
      enum: ["Excellent", "Good", "Fair", "Needs Improvement"],
    },
    recommendations: {
      type: "array",
      items: {
        type: "object",
        properties: {
          category: {
            type: "string",
            enum: ["Transport", "Food", "Energy", "Waste"],
          },
          title: { type: "string" },
          suggestion: { type: "string" },
          impact: { type: "string", enum: ["High", "Medium", "Low"] },
          estimatedSaving: { type: "string" },
        },
        required: ["category", "title", "suggestion", "impact"],
      },
    },
  },
  required: ["summary", "rating", "recommendations"],
};

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      return Response.json({ message: "No session" }, { status: 401 });
    }

    const { activity } = await req.json();

    if (!activity) {
      return Response.json(
        { message: "No activity data provided" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not set");
      return Response.json(
        { message: "Recommendations are not configured" },
        { status: 500 }
      );
    }

    const prompt = `
You are a sustainability advisor. Analyze this user's daily carbon footprint activity and recommend where they should improve.

Raw data (distances in km, food in meals/servings, energy in kWh/kg/m3, waste in kg):
${JSON.stringify(activity, null, 2)}

Category emission totals (kg CO2):
- Transport: ${activity.totalTransport}
- Food: ${activity.totalFood}
- Energy: ${activity.totalEnergy}
- Waste: ${activity.totalWaste}
- Total: ${activity.totalEmission}

Write a short summary (1-2 sentences), an overall rating, and 3-5 specific, actionable recommendations ranked by impact. Reference the actual numbers (e.g. if car distance is high, suggest a specific alternative). Keep the tone practical and encouraging, not preachy. If a category has near-zero emissions, don't force a recommendation for it just to fill space.
`.trim();

    const model = "gemini-3.6-flash"; // verify against current Gemini docs

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: recommendationSchema,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", errText);
      return Response.json(
        { message: "Failed to generate recommendations" },
        { status: 502 }
      );
    }

    const result = await response.json();
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return Response.json(
        { message: "Empty response from model" },
        { status: 502 }
      );
    }

    const parsed = JSON.parse(text);

    return Response.json({ recommendations: parsed });
  } catch (error) {
    console.error("RECOMMENDATIONS ERROR:", error);
    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}