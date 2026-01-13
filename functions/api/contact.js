export async function onRequestPost(context) {
  const data = await context.request.formData();

  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");

  // MailChannels Payload
  const mail = {
    personalizations: [
      {
        to: [{ email: "vuxuantiep@gmail.com" }],
        subject: "Neue Kontaktformular-Nachricht von deiner Website"
      }
    ],
    from: { email: "info@itiep.de" },
    content: [
      {
        type: "text/plain",
        value: `Neue Nachricht über dein Kontaktformular:

Name: ${name}
E-Mail: ${email}

Nachricht:
${message}
`
      }
    ]
  };

  // Mail senden
  await fetch("https://api.mailchannels.net/tx/v1/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mail)
  });

  // Antwort an den Besucher
  const html = `
    <html>
      <body style="font-family: Arial; padding: 40px;">
        <h1>Danke, ${name}!</h1>
        <p>Deine Nachricht wurde erfolgreich gesendet.</p>
        <a href="/">Zurück zur Startseite</a>
      </body>
    </html>
  `;

  return new Response(html, {
    headers: { "Content-Type": "text/html" }
  });
}

