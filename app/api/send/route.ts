import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { emailFormat } = await request.json();
    const { data, error } = await resend.emails.send({
      from: 'noreply@gabrielhooks.dev',
      to: `${emailFormat.receiver}`,
      subject: 'Dashboard Screenshot',
      html: '<h1>Screenshot</h1>',
      attachments: [
        {
          filename: `screenshot.jpg`,
          content: `${emailFormat.image}`,
        },
      ],
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
