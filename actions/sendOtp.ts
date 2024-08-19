import { EmailTemplate } from '@/components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOtp(email:string,name:string,otp:string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to Note Vault',
      react: EmailTemplate({ firstName: name.split(" ")[0],otp }),
    });

    if (error) {
      return {ok:false};
    }

    return {ok:true,data};
  } catch (error) {
    return {ok:false};
  }
}
