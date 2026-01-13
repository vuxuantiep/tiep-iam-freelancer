export async function onRequestPost(context) {
  const data = await context.request.formData();

  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");

  // Hier kannst du E-Mail, Discord, Slack, Telegram usw. integrieren
  // Beispiel: Ausgabe als JSON
  return new Response(
    JSON.stringify({ status: "OK", name, email, message }),
    { headers: { "Content-Type": "application/json" } }
  );
}
