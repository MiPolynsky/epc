import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RECIPIENT_EMAIL = "expert.p.c@mail.ru";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  files_info?: Array<{name: string; size: number}>;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const formData: ContactFormData = await req.json();

    const emailBody = `
Новая заявка с сайта Экспертно-Проектного Центра

Имя: ${formData.name}
Телефон: ${formData.phone}
Email: ${formData.email}

Сообщение:
${formData.message}

${formData.files_info && formData.files_info.length > 0 ? `Прикрепленные файлы (${formData.files_info.length}):\n${formData.files_info.map(f => `- ${f.name} (${Math.round(f.size / 1024)} KB)`).join('\n')}\n\n` : ""}
---
Отправлено: ${new Date().toLocaleString("ru-RU", { timeZone: "Asia/Omsk" })}
    `.trim();

    if (!RESEND_API_KEY) {
      console.log("RESEND_API_KEY not configured. Email content:");
      console.log(emailBody);
      
      return new Response(
        JSON.stringify({
          success: true,
          message: "Заявка получена (email сервис не настроен)",
        }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "noreply@expertpc.ru",
        to: RECIPIENT_EMAIL,
        subject: `Новая заявка с сайта от ${formData.name}`,
        text: emailBody,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Failed to send email: ${emailResponse.status}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Заявка успешно отправлена",
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Ошибка при отправке заявки",
      }),
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
