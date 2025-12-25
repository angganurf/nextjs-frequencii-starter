import PageContainer from "@/components/layout/page-container";

export default function TermsOfServicePage() {
	const seoData = {
		title: "Ketentuan Layanan - Editin Foto",
		description: "Syarat dan Ketentuan penggunaan layanan Editin Foto.",
	};

	return (
		<PageContainer title="Ketentuan Layanan" seo={seoData}>
			<section className="py-16 md:py-28 bg-gray-50/50">
				<div className="container px-4 mx-auto">
					<div className="max-w-4xl mx-auto">
						<div className="text-center mb-12">
							<span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-4">
								Dokumen Legal
							</span>
							<h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 tracking-tight">
								Ketentuan Layanan
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
								Dengan mengakses dan membeli produk dari Editin Foto, Anda
								menyetujui syarat dan ketentuan berikut ini. Mohon dibaca dengan
								seksama.
							</p>

							<div className="space-y-8">
								<section>
									<h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center">
										<span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm mr-3">
											1
										</span>
										Lisensi Penggunaan
									</h3>
									<p>
										Produk "Editin Foto" yang Anda beli memberikan Anda lisensi{" "}
										<strong>Lifetime</strong> (Seumur Hidup) untuk penggunaan
										pribadi maupun komersial terbatas pada proyek Anda sendiri
										atau klien Anda.
									</p>
									<div className="bg-red-50 border-l-4 border-red-500 p-4 my-4 rounded-r-lg">
										<p className="text-sm text-red-700 m-0">
											<strong>Dilarang Keras:</strong> Menjual kembali (resell),
											mendistribusikan ulang, atau membagikan file produk asli
											kepada orang lain tanpa izin tertulis dari Editin Foto.
											Pelanggaran hak cipta akan diproses sesuai hukum yang
											berlaku.
										</p>
									</div>
								</section>

								<section>
									<h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center">
										<span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm mr-3">
											2
										</span>
										Pembayaran & Pengiriman
									</h3>
									<ul className="list-disc pl-6 space-y-2 marker:text-blue-500">
										<li>
											Akses produk akan diberikan secara otomatis ke email Anda
											setelah pembayaran terkonfirmasi LUNAS oleh sistem.
										</li>
										<li>
											Pastikan alamat email yang Anda masukkan valid. Kami tidak
											bertanggung jawab atas kesalahan penulisan email oleh
											pengguna.
										</li>
									</ul>
								</section>

								<section>
									<h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center">
										<span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm mr-3">
											3
										</span>
										Pengembalian Dana (Refund)
									</h3>
									<p>
										Karena sifat produk kami yang merupakan{" "}
										<strong>Produk Digital</strong> yang dapat diunduh langsung,
										kami <strong>TIDAK</strong> melayani permintaan pengembalian
										dana (refund) dengan alasan apapun setelah produk berhasil
										dikirim atau diunduh. Mohon pastikan fitur produk sesuai
										kebutuhan Anda sebelum membeli.
									</p>
								</section>
							</div>

							<div className="mt-12 pt-8 border-t border-gray-100 bg-gray-50 -mx-8 -mb-8 px-8 pb-8 rounded-b-2xl">
								<p className="text-sm text-center">
									Editin Ai Studio berhak mengubah ketentuan ini sewaktu-waktu
									tanpa pemberitahuan sebelumnya.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</PageContainer>
	);
}
