import Link from "next/link";
import { notFound } from "next/navigation";
import PageContainer from "@/components/layout/page-container";
import { prisma } from "@/lib/prisma";

interface PageProps {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PaymentSuccessPage({ searchParams }: PageProps) {
	const params = await searchParams;
	const tripayReference = params.tripay_reference as string | undefined;
	const tripayMerchantRef = params.tripay_merchant_ref as string | undefined;

	// Return 404 if required parameters are missing
	if (!tripayReference || !tripayMerchantRef) {
		notFound();
	}

	// Check if transaction exists in database
	const transaction = await prisma.transaction.findUnique({
		where: { referenceId: tripayReference },
		include: { user: true },
	});

	const seoData = {
		title: "Pembayaran Berhasil - Editin Foto",
		description: "Terima kasih atas pembayaran Anda.",
	};

	// If transaction not found in database
	if (!transaction) {
		return (
			<PageContainer title="Transaksi Tidak Ditemukan" seo={seoData}>
				<section className="py-20 md:py-32 bg-gray-50 flex items-center justify-center min-h-[60vh]">
					<div className="container px-4 mx-auto text-center">
						<div className="max-w-xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
							<div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
								<svg
									className="w-10 h-10 text-red-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									></path>
								</svg>
							</div>

							<h1 className="text-3xl font-bold text-gray-900 mb-4">
								Transaksi Tidak Ditemukan
							</h1>
							<p className="text-lg text-gray-600 mb-6 leading-relaxed">
								Reference ID yang Anda masukkan tidak ditemukan dalam sistem
								kami. Pastikan link yang Anda akses sudah benar.
							</p>

							<div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
								<p className="text-sm text-gray-500 mb-1">Reference ID:</p>
								<p className="text-sm font-mono text-gray-800 break-all">
									{tripayReference}
								</p>
							</div>

							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Link
									href={"/" as any}
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
						<p className="text-lg text-gray-600 mb-4 leading-relaxed">
							Terima kasih banyak! Pembayaran Anda telah kami terima. Silakan
							cek <span className="font-semibold text-gray-900">Email</span>{" "}
							Anda (Inbox/Spam) untuk mengunduh produk.
						</p>

						{/* Transaction Reference */}
						<div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
							<p className="text-sm text-gray-500 mb-1">Reference ID:</p>
							<p className="text-sm font-mono text-gray-800 break-all">
								{tripayReference}
							</p>
							<p className="text-xs text-gray-400 mt-2">
								Status:{" "}
								<span
									className={`font-medium ${
										transaction.status === "PAID"
											? "text-green-600"
											: "text-yellow-600"
									}`}
								>
									{transaction.status}
								</span>
							</p>
						</div>

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
								href={"/" as any}
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
