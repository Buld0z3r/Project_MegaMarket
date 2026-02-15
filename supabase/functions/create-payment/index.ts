import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { paymentId, orderId, amount, paymentMethod, description, email } = await req.json();

    if (!paymentId || !orderId || !amount || !paymentMethod) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const baseUrl = req.headers.get("origin") || "http://localhost:5173";
    const returnUrl = `${baseUrl}/payment-confirmation?paymentId=${paymentId}`;
    const notifyUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/payment-webhook`;

    const sessionToken = crypto.randomUUID();
    const paymentUrl = `${baseUrl}/payment-gateway?token=${sessionToken}&paymentId=${paymentId}&amount=${amount}&method=${paymentMethod}&returnUrl=${encodeURIComponent(returnUrl)}`;

    const { error: updateError } = await supabaseClient
      .from("payments")
      .update({
        transaction_id: sessionToken,
        payment_url: paymentUrl,
      })
      .eq("id", paymentId);

    if (updateError) {
      console.error("Error updating payment:", updateError);
      throw updateError;
    }

    return new Response(
      JSON.stringify({
        success: true,
        paymentUrl: paymentUrl,
        sessionToken: sessionToken,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error creating payment:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
