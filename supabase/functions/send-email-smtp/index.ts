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

    const smtpHost = Deno.env.get("SMTP_HOST") || "smtp.mail.ru";
    const smtpPort = parseInt(Deno.env.get("SMTP_PORT") || "587");
    const smtpUser = Deno.env.get("SMTP_USER");
    const smtpPass = Deno.env.get("SMTP_PASS");
    const emailToStr = Deno.env.get("EMAIL_TO") || "info@epc-expert.ru";
    const emailTo = emailToStr.split(',').map(email => email.trim());

    if (!smtpUser || !smtpPass) {
      console.error("SMTP credentials missing");
      return new Response(
        JSON.stringify({
          error: "SMTP credentials not configured",
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
    const emailBody = `Новая заявка с сайта Экспертно-Проектного Центра

Имя: ${payload.name}
Телефон: ${payload.phone}
Email: ${payload.email}

Сообщение:
${payload.message || ""}${filesText}

---
Отправлено: ${new Date(payload.created_at || new Date()).toLocaleString("ru-RU", { timeZone: "Asia/Omsk" })}`;

    console.log(`Connecting to ${smtpHost}:${smtpPort}...`);

    const useTLS = smtpPort === 587;
    
    let conn;
    if (useTLS) {
      conn = await Deno.connect({
        hostname: smtpHost,
        port: smtpPort,
      });
    } else {
      conn = await Deno.connectTls({
        hostname: smtpHost,
        port: smtpPort,
      });
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    async function readResponse(): Promise<string> {
      const buffer = new Uint8Array(4096);
      const n = await Promise.race([
        conn.read(buffer),
        new Promise<null>((resolve) => setTimeout(() => resolve(null), 10000))
      ]);
      
      if (n === null) {
        throw new Error("SMTP read timeout");
      }
      
      const response = decoder.decode(buffer.subarray(0, n || 0));
      console.log("SMTP <<<", response.trim());
      return response;
    }

    async function sendCommand(command: string): Promise<string> {
      console.log("SMTP >>>", command.replace(smtpPass, "***"));
      await conn.write(encoder.encode(command + "\r\n"));
      return await readResponse();
    }

    await readResponse();
    await sendCommand(`EHLO ${smtpHost}`);
    
    if (useTLS) {
      await sendCommand("STARTTLS");
      conn = await Deno.startTls(conn, { hostname: smtpHost });
      await sendCommand(`EHLO ${smtpHost}`);
    }
    
    await sendCommand("AUTH LOGIN");
    await sendCommand(btoa(smtpUser));
    await sendCommand(btoa(smtpPass));
    await sendCommand(`MAIL FROM:<${smtpUser}>`);

    for (const recipient of emailTo) {
      await sendCommand(`RCPT TO:<${recipient}>`);
    }

    await sendCommand("DATA");

    const emailMessage = [
      `From: ${smtpUser}`,
      `To: ${emailTo.join(', ')}`,
      `Subject: =?UTF-8?B?${btoa(unescape(encodeURIComponent(emailSubject)))}?=`,
      "MIME-Version: 1.0",
      "Content-Type: text/plain; charset=UTF-8",
      "Content-Transfer-Encoding: base64",
      "",
      btoa(unescape(encodeURIComponent(emailBody))),
      ".",
    ].join("\r\n");

    await conn.write(encoder.encode(emailMessage + "\r\n"));
    await readResponse();
    await sendCommand("QUIT");
    
    try {
      conn.close();
    } catch (e) {
      console.log("Connection already closed", e);
    }

    console.log("Email sent successfully");

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
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