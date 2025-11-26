import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactMessage {
  name: string;
  phone: string;
  email: string;
  message: string;
  files_info?: Array<{ name: string; size: number }>;
  created_at: string;
}

Deno.serve(async (req: Request) => {
  console.log("Function called");
  
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const botToken = "8585590275:AAFf-g8J_QJ99RXEDaWogOMcIjWlHD6uoLU";
    const chatId = "226815424";

    console.log("Bot token present:", !!botToken);
    console.log("Chat ID present:", !!chatId);

    const data: ContactMessage = await req.json();
    console.log("Received data:", JSON.stringify(data));

    const filesText = data.files_info && data.files_info.length > 0
      ? "\n\n📎 Прикрепленные файлы:\n" + data.files_info.map(f => `  • ${f.name} (${(f.size / 1024).toFixed(1)} KB)`).join("\n")
      : "";

    const messageText = `🔔 <b>Новая заявка с сайта!</b>\n\n` +
      `👤 <b>Имя:</b> ${data.name}\n` +
      `📱 <b>Телефон:</b> ${data.phone}\n` +
      `📧 <b>Email:</b> ${data.email}\n` +
      `💬 <b>Сообщение:</b>\n${data.message || "Не указано"}` +
      filesText +
      `\n\n🕐 <b>Дата:</b> ${new Date(data.created_at).toLocaleString("ru-RU")}`;

    console.log("Sending to Telegram...");
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: "HTML",
      }),
    });

    const responseData = await response.text();
    console.log("Telegram response:", responseData);

    if (!response.ok) {
      console.error("Telegram API error:", responseData);
      throw new Error(`Telegram API error: ${response.status}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Notification sent" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});