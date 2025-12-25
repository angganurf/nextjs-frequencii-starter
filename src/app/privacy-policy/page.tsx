import PageContainer from "@/components/layout/page-container";

export default function PrivacyPolicyPage() {
	const seoData = {
		title: "Kebijakan Privasi - Editin Foto",
		description: "Kebijakan Privasi untuk layanan Editin Foto.",
	};

	return (
		<PageContainer title="Kebijakan Privasi" seo={seoData}>
			<section className="py-16 md:py-28 bg-gray-50/50">
				<div className="container px-4 mx-auto">
					<div className="max-w-4xl mx-auto">
						<div className="text-center mb-12">
							<span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-4">
								Dokumen Legal
							</span>
							<h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 tracking-tight">
								Kebijakan Privasi
							</h1>
							<p className="text-gray-500">
								Terakhir diperbarui:{" "}
								<span className="font-medium text-gray-700">
									{new Date().toLocaleDateString("id-ID", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</span>
							</p>
						</div>

						<div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-gray-100 p-8 md:p-12 prose prose-lg max-w-none text-gray-600">
							<p className="lead text-lg md:text-xl text-gray-700 font-medium leading-relaxed mb-8">
								Selamat datang di Editin Foto. Kami menghargai privasi Anda dan
								berkomitmen untuk melindungi informasi pribadi Anda. Dokumen ini
								menjelaskan bagaimana kami mengelola data Anda.
							</p>

							<div className="space-y-8">
								<section>
									<h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center">
										<span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm mr-3">
											1
										</span>
										Informasi yang Kami Kumpulkan
									</h3>
									<p className="mb-4">
										Kami mengumpulkan informasi yang diperlukan untuk memproses
										pesanan dan meningkatkan layanan kami, termasuk:
									</p>
									<ul className="list-disc pl-6 space-y-2 marker:text-blue-500">
										<li>
											<strong>Identitas Diri:</strong> Nama lengkap untuk
											keperluan faktur dan identifikasi pesanan.
										</li>
										<li>
											<strong>Kontak:</strong> Alamat email dan nomor WhatsApp
											untuk pengiriman produk dan komunikasi.
										</li>
										<li>
											<strong>Informasi Pembayaran:</strong> Data transaksi yang
											diproses secara aman oleh mitra pembayaran kami (Tripay).
										</li>
									</ul>
								</section>

								<section>
									<h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center">
										<span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm mr-3">
											2
										</span>
										Penggunaan Informasi
									</h3>
									<p className="mb-4">
										Data Anda digunakan semata-mata untuk tujuan operasional
										layanan kami:
									</p>
									<ul className="list-disc pl-6 space-y-2 marker:text-blue-500">
										<li>Memproses dan memverifikasi pembayaran Anda.</li>
										<li>
											Mengirimkan tautan unduhan produk digital secara otomatis.
										</li>
										<li>
											Memberikan dukungan teknis jika Anda mengalami kendala.
										</li>
										<li>
											Menginformasikan pembaruan produk atau penawaran khusus
											(opsional).
										</li>
									</ul>
								</section>

								<section>
									<h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center">
										<span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm mr-3">
											3
										</span>
										Perlindungan & Pihak Ketiga
									</h3>
									<p>
										Kami menerapkan standar keamanan industri untuk melindungi
										data Anda. Kami tidak menjual data Anda ke pihak manapun.
										Pembayaran diproses melalui gateway terenkripsi (Tripay),
										sehingga kami tidak menyimpan detail kartu kredit atau
										kredensial perbankan Anda secara langsung.
									</p>
								</section>
							</div>

							<div className="mt-12 pt-8 border-t border-gray-100 bg-gray-50 -mx-8 -mb-8 px-8 pb-8 rounded-b-2xl">
								<h4 className="font-bold text-gray-900 mb-2">
									Punya pertanyaan tentang privasi?
								</h4>
								<p className="text-sm">
									Hubungi tim kami di{" "}
									<a
										href="/contact"
										className="text-blue-600 font-semibold hover:underline"
									>
										Halaman Kontak
									</a>{" "}
									atau WhatsApp di 085770044691.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</PageContainer>
	);
}
