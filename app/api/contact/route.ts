export async function POST(req: Request) {
  const body = await req.json();
  // TODO: wire up email delivery (Resend, SendGrid, etc.)
  console.log("Contact form submission:", body);
  return Response.json({ ok: true });
}
