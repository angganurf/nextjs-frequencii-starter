import { Resend } from "resend";

interface EmailProps {
	to: string;
	customerName: string;
	credentials?: { username: string; password: string };
	invoice?: {
		date: string;
		orderId: string;
		productName: string;
		price: number;
		fee: number;
		total: number;
	};
}

export const sendProductEmail = async ({
	to,
	customerName,
	credentials,
	invoice,
}: EmailProps): Promise<boolean> => {
	const resendApiKey = process.env.RESEND_API_KEY;

	if (!resendApiKey) {
		console.error("RESEND_API_KEY is not defined in .env.local");
		return false;
	}

	const resend = new Resend(resendApiKey);

	const productLink = "https://apps.editinfoto.site";
	const supportLink = "https://editinfoto.site/contact";
	// Using absolute URL for image in email clients
	const heroImage =
		"https://yt3.ggpht.com/ytzpP74QAVdUyuLw0FMdeNcPC5avBUTvPs_-EPsFDxr5ZEoaK7q43nSvQYUBCKyg8Bja4_atbaai=s640-rw-nd-v1";
	// Currency Formatter
	const formatRp = (num: number) => "Rp " + num.toLocaleString("id-ID");

	const credentialsHtml = credentials
		? `
      <div style="background-color: #f1f5f9; padding: 20px; border-radius: 12px; margin: 24px 0; text-align: left; border: 1px solid #e2e8f0;">
        <h4 style="margin: 0 0 12px 0; color: #0f172a; font-size: 16px;">Detail Akun Premium:</h4>
        <div style="margin-bottom: 8px;">
            <span style="color: #64748b; font-size: 14px;">Username:</span><br/>
            <strong style="color: #0f172a; font-size: 16px;">${credentials.username}</strong>
        </div>
        <div>
            <span style="color: #64748b; font-size: 14px;">Password:</span><br/>
            <strong style="color: #0f172a; font-size: 16px;">${credentials.password}</strong>
        </div>
      </div>
    `
		: "";

	const invoiceHtml = invoice
		? `
        <div style="margin-top: 32px; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background-color: #f8fafc; padding: 12px 20px; border-bottom: 1px solid #e2e8f0;">
                <h3 style="margin: 0; font-size: 16px; color: #0f172a;">Invoice #${
									invoice.orderId
								}</h3>
                <p style="margin: 4px 0 0; font-size: 12px; color: #64748b;">${
									invoice.date
								}</p>
            </div>
            <div style="padding: 20px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                    <tr>
                        <td style="padding-bottom: 8px; color: #64748b;">Penerima</td>
                        <td style="padding-bottom: 8px; color: #0f172a; text-align: right;"><strong>${customerName}</strong><br/><span style="font-size: 12px; font-weight: normal;">${to}</span></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; border-top: 1px dashed #e2e8f0; color: #64748b;">Produk</td>
                        <td style="padding: 8px 0; border-top: 1px dashed #e2e8f0; color: #0f172a; text-align: right;">${
													invoice.productName
												}</td>
                    </tr>
                     <tr>
                        <td style="padding: 8px 0; color: #64748b;">Harga</td>
                        <td style="padding: 8px 0; color: #0f172a; text-align: right;">${formatRp(
													invoice.price
												)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #64748b;">Biaya Transaksi</td>
                        <td style="padding: 8px 0; color: #0f172a; text-align: right;">${formatRp(
													invoice.fee
												)}</td>
                    </tr>
                    <tr>
                        <td style="padding-top: 12px; border-top: 1px solid #e2e8f0; font-weight: bold; color: #0f172a;">Total Pembayaran</td>
                        <td style="padding-top: 12px; border-top: 1px solid #e2e8f0; font-weight: bold; color: #2563eb; text-align: right; font-size: 16px;">${formatRp(
													invoice.total
												)}</td>
                    </tr>
                </table>
            </div>
        </div>
    `
		: "";

	const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; margin-top: 20px; margin-bottom: 20px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            


            <div style="padding: 32px 24px;">
                <!-- Header -->
                <div style="text-align: center; margin-bottom: 24px;">
                    <h1 style="color: #0f172a; margin: 0 0 12px 0; font-size: 24px;">Pembayaran Berhasil!</h1>
                    <p style="font-size: 16px; line-height: 1.5; color: #475569; margin: 0;">Terima kasih, <strong>${customerName}</strong>. Transaksi Anda telah kami terima.</p>
                </div>

				<!-- Hero Image -->
				<div style="background-color: #0f172a; padding: 0; text-align: center;">
					<img src="${heroImage}" alt="Editin Foto Preview" title="Editin Foto Preview" style="width: 100%; max-width: 600px; height: auto; display: block;" />
				</div>				

                <!-- CTA Section -->
                <div style="text-align: center; margin-bottom: 20px; margin-top: 20px">
                    <a href="${productLink}" style="display: inline-block; background-color: #2563eb; color: white; padding: 14px 28px; text-decoration: none; border-radius: 99px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.3);">
                        Akses Editin Foto &rarr;
                    </a>
                </div>

                <!-- Credentials -->
                ${credentialsHtml}

                <!-- Invoice -->
                ${invoiceHtml}
                
                <!-- Footer -->
                <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #f1f5f9; text-align: center; color: #94a3b8; font-size: 12px;">
                    <p style="margin: 0 0 8px 0;">Email ini dikirim secara otomatis. Mohon jangan membalas email ini.</p>
                    <p style="margin: 0;">Butuh bantuan? <a href="${supportLink}" style="color: #2563eb; text-decoration: none;">Hubungi Support</a></p>
                    <p style="margin-top: 16px;">&copy; ${new Date().getFullYear()} Editin Foto. All rights reserved.</p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `;

	try {
		console.log("Sending email via Resend...");
		const { data, error } = await resend.emails.send({
			from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
			to: [to],
			subject: "Akses Premium & Invoice - Editin Foto",
			html: htmlContent,
		});

		if (error) {
			console.error("Resend API Error:", error);
			console.log("Resend Error Details:", JSON.stringify(error, null, 2));
			return false;
		}

		console.log("Email sent via Resend ID:", data?.id);
		return true;
	} catch (error) {
		console.error("Error sending email with Resend:", error);
		return false;
	}
};
