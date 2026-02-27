// @ts-ignore: Deno module import might not be recognized by all TS configs
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// @ts-ignore: Deno global object might not be recognized by all TS configs
declare const Deno: any;

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { symptoms, breed, age, weight } = await req.json();

        const apiKey = Deno.env.get('GEMINI_API_KEY');
        if (!apiKey) {
            throw new Error("Missing Gemini API Key in environment variables.");
        }

        const systemPrompt = `You are an expert veterinary triage assistant. Your job is to analyze symptoms provided by a pet owner.
You must cross-reference the symptoms with the specific breed's known genetic predispositions.
You must NEVER definitively diagnose a condition.

You must output your response STRICTLY as a JSON object with the following three keys:
1. "severity": Must be strictly one of "RED_EMERGENCY", "YELLOW_MONITOR", or "GREEN_NORMAL".
2. "analysis": A short, breed-specific explanation of what might be happening, considering the pet's age and weight.
3. "actionable_steps": An array of 2-3 immediate things the owner should do. For RED_EMERGENCY or YELLOW_MONITOR, the first step MUST be to contact a veterinarian.`;

        const userPrompt = `Pet Profile:
- Breed: ${breed || 'Unknown'}
- Age: ${age || 'Unknown'}
- Weight: ${weight || 'Unknown'}

Symptoms: ${symptoms}`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                system_instruction: {
                    parts: { text: systemPrompt }
                },
                contents: [
                    {
                        parts: [{ text: userPrompt }]
                    }
                ],
                generationConfig: {
                    response_mime_type: "application/json",
                    temperature: 0.2
                }
            }),
        });

        const geminiData = await response.json();
        if (!response.ok) {
            throw new Error(geminiData.error?.message || "Gemini API error");
        }

        const aiContent = geminiData.candidates[0].content.parts[0].text;
        const parsedData = JSON.parse(aiContent);

        return new Response(JSON.stringify(parsedData), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500,
        });
    }
});
