import Link from "next/link";
import PageContainer from "@/components/layout/page-container";

export default function PaymentSuccessPage() {
	const seoData = {
		title: "Pembayaran Berhasil - Editin Foto",
		description: "Terima kasih atas pembayaran Anda.",
	};

	return (
		<PageContainer title="Pembayaran Berhasil" seo={seoData}>
			<section className="py-20 md:py-32 bg-gray-50 flex items-center justify-center min-h-[60vh]">
				<div className="container px-4 mx-auto text-center">
					<div className="max-w-xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
						<div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
							<svg
								className="w-10 h-10 text-green-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M5 13l4 4L19 7"
								></path>
							</svg>
						</div>

						<h1 className="text-3xl font-bold text-gray-900 mb-4">
							Pembayaran Berhasil!
						</h1>
						<p className="text-lg text-gray-600 mb-8 leading-relaxed">
							Terima kasih banyak! Pembayaran Anda telah kami terima. Silakan
							cek <span className="font-semibold text-gray-900">Email</span>{" "}
							Anda (Inbox/Spam) untuk mengunduh produk.
						</p>

						<div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 text-left flex items-start">
							<svg
								className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<p className="text-sm text-blue-700">
								Jika email tidak masuk dalam 5 menit, silakan hubungi kami via
								WhatsApp dengan menyertakan bukti pembayaran.
							</p>
						</div>

						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link
								href="/"
								className="inline-block px-8 py-3 text-sm font-semibold text-white transition duration-200 bg-blue-600 rounded-full hover:bg-blue-700 shadow-lg shadow-blue-600/30"
							>
								Kembali ke Beranda
							</Link>
							<Link
								href="https://wa.me/6285770044691"
								target="_blank"
								className="inline-block px-8 py-3 text-sm font-semibold text-gray-700 transition duration-200 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:text-gray-900"
							>
								Hubungi Support
							</Link>
						</div>
					</div>
				</div>
			</section>
		</PageContainer>
	);
}
