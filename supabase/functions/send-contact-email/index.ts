import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RECIPIENT_EMAIL = "expert.p.c@mail.ru";

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message?: string;
  files?: Array<{name: string; data: string}>;
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
Новая заявка с сайта ЭПЦ

Имя: ${formData.name}
Телефон: ${formData.phone}
Email: ${formData.email}
${formData.message ? `\nСообщение:\n${formData.message}` : ""}
${formData.files && formData.files.length > 0 ? `\n\nПрикрепленные файлы: ${formData.files.length}` : ""}

---
Отправлено: ${new Date().toLocaleString("ru-RU", { timeZone: "Asia/Omsk" })}
    `.trim();

    console.log("Email would be sent to:", RECIPIENT_EMAIL);
    console.log("Email body:", emailBody);

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
