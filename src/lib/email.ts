import nodemailer from "nodemailer";

export const sendProductEmail = async (to: string, customerName: string) => {
	const smtpConfig = {
		host: process.env.SMTP_HOST,
		port: Number(process.env.SMTP_PORT) || 587,
		secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS,
		},
	};

	const transporter = nodemailer.createTransport(smtpConfig);

	const productLink = "https://tinyurl.com/editinfoto-v1-0"; // Replace with actual link
	const supportLink = "https://wa.me/6285770044691"; // Replace with actual support

	const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #1a73e8;">Terima Kasih, ${customerName}!</h1>
        <p style="font-size: 16px; color: #555;">Pembayaran Anda berhasil diterima.</p>
      </div>
      
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; text-align: center;">
        <p style="margin-bottom: 20px;">Silakan kunjungi apps Editin Foto:</p>
        <a href="${productLink}" style="display: inline-block; background-color: #1a73e8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">Download Editin Foto</a>
        <p style="margin-top: 10px; font-size: 12px; color: #888;">(Link ini valid seumur hidup)</p>
      </div>

      <div style="margin-top: 30px; border-top: 1px solid #e0e0e0; padding-top: 20px;">
        <h3 style="margin-bottom: 10px;">Detail Transaksi:</h3>
        <p style="margin: 5px 0;"><strong>Produk:</strong> Editin Foto Premium - Unlimited</p>
        <p style="margin: 5px 0;"><strong>Status:</strong> Lunas</p>
      </div>

      <div style="margin-top: 30px; text-align: center; color: #888; font-size: 14px;">
        <p>Jika ada kendala, hubungi kami di <a href="${supportLink}" style="color: #1a73e8;">Support WA</a></p>
        <p>&copy; ${new Date().getFullYear()} Editin Foto. All rights reserved.</p>
      </div>
    </div>
  `;

	try {
		const info = await transporter.sendMail({
			from: `"${process.env.SMTP_FROM_NAME || "Editin Foto"}" <${
				process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER
			}>`,
			to,
			subject: "Download Link - Editin Foto Premium",
			html: htmlContent,
		});

		console.log("Message sent: %s", info.messageId);
		return true;
	} catch (error) {
		console.error("Error sending email:", error);
		return false;
	}
};
