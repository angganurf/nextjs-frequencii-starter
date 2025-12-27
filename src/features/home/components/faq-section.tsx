"use client";

import { useState } from "react";

interface FAQItem {
	question: string;
	answer: string;
}

const faqData: FAQItem[] = [
	{
		question: "Apa itu Editin Foto?",
		answer:
			"Editin Foto adalah platform berbasis AI yang membantu kamu mengedit foto secara profesional dengan mudah dan cepat. Mulai dari foto produk, portrait, hingga desain interior - semua bisa dilakukan dalam hitungan detik.",
	},
	{
		question: "Apakah benar sekali bayar untuk selamanya?",
		answer:
			"Ya, benar! Dengan membeli paket Lifetime Access, kamu mendapatkan akses ke semua fitur yang ada saat ini DAN fitur-fitur baru yang akan kami rilis di masa depan. Tidak ada biaya bulanan atau tahunan.",
	},
	{
		question: "Bagaimana cara menggunakan Editin Foto?",
		answer:
			"Sangat mudah! Setelah melakukan pembayaran, kamu akan mendapatkan akses ke dashboard. Tinggal upload foto, pilih fitur yang diinginkan, dan AI kami akan memproses fotomu dalam hitungan detik.",
	},
	{
		question: "Bagaimana jika saya tidak puas dengan hasilnya?",
		answer:
			"AI kami terus belajar dan berkembang. Jika hasil tidak sesuai ekspektasi, kamu bisa mencoba ulang dengan prompt yang berbeda atau menghubungi tim support kami untuk bantuan.",
	},
	{
		question: "Metode pembayaran apa saja yang tersedia?",
		answer:
			"Kami menyediakan berbagai metode pembayaran termasuk transfer bank, e-wallet (GoPay, OVO, DANA, dll), dan QRIS. Semua transaksi diproses melalui payment gateway yang aman.",
	},
	{
		question: "Bagaimana cara menghubungi support?",
		answer:
			"Kamu bisa menghubungi tim support kami melalui email atau WhatsApp yang tersedia di halaman kontak. Kami siap membantu 24/7.",
	},
];

const FAQSection: React.FC = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleFAQ = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<section className="mt-16 bg-white">
			<div className="container px-4 mx-auto">
				<div className="max-w-3xl mx-auto">
					{/* Header */}
					<div className="text-center mb-12">
						<span className="inline-flex items-center h-6 mb-4 px-3 text-xs uppercase font-semibold text-blue-600 bg-blue-100 rounded-full">
							FAQ
						</span>
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
							Pertanyaan Umum
						</h2>
						<p className="text-gray-600">
							Temukan jawaban untuk pertanyaan yang sering diajukan
						</p>
					</div>

					{/* FAQ Items */}
					<div className="space-y-4 ">
						{faqData.map((faq, index) => (
							<div
								key={index}
								className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-300"
							>
								<button
									onClick={() => toggleFAQ(index)}
									className="w-full px-6 py-5 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors cursor-pointer"
								>
									<span className="font-semibold text-gray-900 pr-4">
										{faq.question}
									</span>
									<span
										className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-transform duration-300 ${
											openIndex === index ? "rotate-180" : ""
										}`}
									>
										<svg
											className="w-4 h-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 9l-7 7-7-7"
											/>
										</svg>
									</span>
								</button>
								<div
									className={`overflow-hidden transition-all duration-300 ${
										openIndex === index ? "max-h-96" : "max-h-0"
									}`}
								>
									<div className="px-6 pb-5 text-gray-600 leading-relaxed">
										{faq.answer}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default FAQSection;
