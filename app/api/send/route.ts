import ConfirmationEmail from '@/components/ConfirmationEmail';
import { Resend } from 'resend';
const resend = new Resend(String(process.env.RESEND_API));

export async function POST(req: Request) {
    try {
        const {email} = await req.json();
        const data = await resend.emails.send({
            from: 'SeBcO TOGO <onboarding@resend.dev>',
            to: email.toString(),
            subject: 'Confirmation de votre commende sur Sebcotogo',
            react: ConfirmationEmail () as React.ReactElement,
        });
        return Response.json(data);
    } catch (error) {
        return Response.json({ error });
    }
}