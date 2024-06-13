import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { emailFormat } = await request.json();
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: `${emailFormat.receiver}`,
      subject: 'Hello world',
      html: '<h1>Welcome Mate</h1>',
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
