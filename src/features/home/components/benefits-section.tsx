"use client";

import React from "react";
import Link from "next/link";

const BenefitsSection: React.FC = () => {
	return (
		<section className="py-16 bg-gray-50">
			<div className="container px-4 mx-auto">
				<div className="max-w-4xl mx-auto">
					{/* Main Headline */}
					<div className="text-center mb-12">
						<span className="inline-flex items-center h-6 mb-4 px-2 text-xs uppercase font-medium text-yellowGreen-700 bg-blue-200 rounded-full">
							Benefit
						</span>
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6 px-2">
							Edit Foto Jadi Profesional dalam 10 Detik{" "}
							<span className="text-blue-600">Tanpa Studio & Tanpa Ribet.</span>
						</h2>
						<p className="text-xl text-gray-600">
							Upload foto → pilih style → hasil langsung siap jual.
						</p>
					</div>

					{/* Highlight Box */}
					<div className="bg-linear-to-r text-center from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 mb-12 border border-blue-100">
						<p className="text-lg text-gray-700 mb-4">
							Bayangin… akses{" "}
							<span className="font-semibold text-blue-600">
								puluhan fitur canggih tanpa batas
							</span>
							, tanpa langganan bulanan, tanpa biaya tersembunyi.
						</p>
						<p className="text-lg text-gray-700">
							Sekali bayar, langsung bisa dipakai terus + dapet update fitur
							selamanya
						</p>
					</div>

					{/* Pain Points */}
					<div className="space-y-8 mb-12 text-justify px-4">
						{/* Pain Point 1 */}
						<div className="flex gap-4">
							<div className="shrink-0 w-10 h-10 bg-red-200 rounded-full flex items-center justify-center">
								<span className="text-xl">😩</span>
							</div>
							<div>
								<p className="text-gray-700 leading-relaxed">
									<span className="font-semibold">
										Pernah ngerasa capek harus keluar jutaan rupiah
									</span>{" "}
									cuma buat sekali foto studio? Entah itu foto wedding,
									pre-wedding, atau foto bayi. Belum lagi ribet ngatur jadwal,
									nunggu fotografer, dan hasil edit yang kadang lama banget.
								</p>
							</div>
						</div>

						{/* Pain Point 2 */}
						<div className="flex gap-4">
							<div className="shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
								<span className="text-xl">😵</span>
							</div>
							<div>
								<p className="text-gray-700 leading-relaxed">
									<span className="font-semibold">
										Atau kamu seller yang lagi mentok?
									</span>{" "}
									Bingung shoot foto produk, edit banner promosi, atau ngerasa
									"duh gue gaptek banget"? Akhirnya foto produk gitu-gitu aja,
									audiens bosan, dan penjualan pun jalan di tempat.
								</p>
							</div>
						</div>
					</div>

					{/* Solution */}
					<div className="bg-gray-900 rounded-2xl p-8 md:p-10 mb-12 text-center">
						<p className="text-2xl md:text-3xl font-bold text-white mb-4">
							Nah, kenalin <span className="text-blue-600">Editin Foto</span>{" "}
							📸✨
						</p>
						<p className="text-lg text-gray-300 mb-6">
							Solusi simpel yang bikin HP kamu berubah jadi{" "}
							<span className="text-blue-400 font-semibold">
								studio foto profesional
							</span>
							.
						</p>

						{/* Benefits */}
						<div className="flex flex-wrap justify-center gap-4 mb-6">
							<div className="bg-white/10 px-4 py-2 rounded-full text-white text-sm">
								✅ Tanpa skill editing ribet
							</div>
							<div className="bg-white/10 px-4 py-2 rounded-full text-white text-sm">
								✅ Tanpa alat mahal
							</div>
							<div className="bg-white/10 px-4 py-2 rounded-full text-white text-sm">
								✅ Upload foto, AI yang kerja
							</div>
						</div>
					</div>

					{/* Use Cases */}
					<div className="mb-12">
						<p className="text-lg text-gray-700 text-center leading-relaxed">
							Mulai dari{" "}
							<span className="font-semibold text-pink-600">
								foto newborn yang gemes
							</span>
							,{" "}
							<span className="font-semibold text-purple-600">
								foto pernikahan yang elegan
							</span>
							, sampai{" "}
							<span className="font-semibold text-blue-600">
								foto produk yang keliatan niat & jualan banget
							</span>{" "}
							— semuanya jadi otomatis dalam hitungan detik.
						</p>
					</div>

					{/* Bottom CTA */}
					<div className="bg-linear-to-r from-yellowGreen-700 to-[#1765cc] rounded-2xl p-8 text-center">
						<p className="text-xl md:text-2xl font-bold text-white mb-4">
							Intinya? Editin Foto itu tools paling murah dan paling gampang
							buat{" "}
							<span className="text-yellow-300">
								upgrade visual kamu sekarang juga
							</span>
							.
						</p>
						<p className="text-lg text-blue-100 mb-6">
							Sekali bayar, manfaatnya panjang 💥
						</p>
						<Link
							href="#payment-section"
							onClick={() => {
								import("@/lib/fb-events").then(({ trackViewContent }) => {
									trackViewContent();
								});
							}}
							className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-blue-600 bg-white rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
						>
							Lihat Harga Spesial →
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default BenefitsSection;
