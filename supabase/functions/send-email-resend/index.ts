import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface EmailPayload {
  name: string;
  phone: string;
  email: string;
  message: string;
  files_info?: Array<{ name: string; size: number }>;
  created_at?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const payload: EmailPayload = await req.json();

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const emailToStr = Deno.env.get("EMAIL_TO") || "expert.p.c@mail.ru";
    const emailTo = emailToStr.split(',').map(email => email.trim());
    const emailFrom = Deno.env.get("EMAIL_FROM") || "onboarding@resend.dev";

    if (!resendApiKey) {
      console.error("Resend API key missing");
      return new Response(
        JSON.stringify({
          error: "Resend API key not configured",
          success: false,
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    let filesText = "";
    if (payload.files_info && payload.files_info.length > 0) {
      filesText = "\n\nПрикрепленные файлы (" + payload.files_info.length + "):";
      filesText += "\n" + payload.files_info
        .map((f) => `- ${f.name} (${Math.round(f.size / 1024)} KB)`)
        .join("\n");
    }

    const emailSubject = `Новая заявка с сайта от ${payload.name}`;
    const emailBody = `Новая заявка с сайта Экспертно-Проектного Центра\n\nИмя: ${payload.name}\nТелефон: ${payload.phone}\nEmail: ${payload.email}\n\nСообщение:\n${payload.message || ""}${filesText}\n\n---\nОтправлено: ${new Date(payload.created_at || new Date()).toLocaleString("ru-RU", { timeZone: "Asia/Omsk" })}`;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Новая заявка с сайта Экспертно-Проектного Центра</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Имя:</strong> ${payload.name}</p>
          <p><strong>Телефон:</strong> ${payload.phone}</p>
          <p><strong>Email:</strong> ${payload.email}</p>
        </div>
        ${payload.message ? `
          <div style="margin: 20px 0;">
            <strong>Сообщение:</strong>
            <p style="white-space: pre-wrap;">${payload.message}</p>
          </div>
        ` : ""}
        ${payload.files_info && payload.files_info.length > 0 ? `
          <div style="margin: 20px 0;">
            <strong>Прикрепленные файлы (${payload.files_info.length}):</strong>
            <ul>
              ${payload.files_info.map((f) => `<li>${f.name} (${Math.round(f.size / 1024)} KB)</li>`).join("")}
            </ul>
          </div>
        ` : ""}
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          Отправлено: ${new Date(payload.created_at || new Date()).toLocaleString("ru-RU", { timeZone: "Asia/Omsk" })}
        </div>
      </div>
    `;

    console.log("Sending email via Resend...");

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: emailFrom,
        to: emailTo,
        subject: emailSubject,
        text: emailBody,
        html: emailHtml,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend API error:", resendData);
      throw new Error(resendData.message || "Failed to send email");
    }

    console.log("Email sent successfully via Resend:", resendData);

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully", id: resendData.id }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});