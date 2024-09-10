
import { EmailTemplate } from '@/components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);


export async function POST(req:Request) {
  const body = await req.json()
    try {
    const { data, error } = await resend.emails.send({
      from: 'babayaga11079@gmail.com',
      to: [body.email],
      subject: 'Welcome to Note Vault',
      react: EmailTemplate({ firstName: body.name.split(" ")[0],otp:body.otp}),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
