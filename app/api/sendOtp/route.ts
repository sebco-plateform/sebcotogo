import { Resend } from 'resend';
import RestEmail from "@/components/ResetEmail";

const resend = new Resend(String(process.env.RESEND_API));

export async function POST(req: Request) {
    try {
        const body :{email:string, otp: string} = await req.json();
        const data = await resend.emails.send({
            from: 'SeBcO TOGO <onboarding@resend.dev>',
            to: body.email.toString(),
            subject: 'Récupération du mot de passe.',
            react: RestEmail ({otp: body.otp }) as React.ReactElement,
        });

        return Response.json(data);
    } catch (error) {
        return Response.json({ error });
    }
}