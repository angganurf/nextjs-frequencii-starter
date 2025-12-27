import React from "react";

interface FeatureCategory {
	icon: React.ReactNode;
	iconBg: string;
	title: string;
	description: string;
	features: string[];
}

const categories: FeatureCategory[] = [
	{
		icon: (
			<svg
				className="w-6 h-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
				/>
			</svg>
		),
		iconBg: "bg-indigo-100 text-indigo-600",
		title: "Edit & Gabung",
		description: "Manipulasi foto tingkat lanjut dengan sekali klik.",
		features: [
			"Gabungin Foto",
			"Foto Miniatur",
			"Perluas Foto (AI Expand)",
			"Edit Foto",
			"Perbaiki Foto (Enhance)",
			"Face Swap",
			"Foto Artis",
			"Hapus BG",
		],
	},
	{
		icon: (
			<svg
				className="w-6 h-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
				/>
			</svg>
		),
		iconBg: "bg-blue-100 text-blue-600",
		title: "Produk & Promosi",
		description: "Tingkatkan penjualan dengan visual produk profesional.",
		features: [
			"Foto Produk",
			"Foto Produk & Model",
			"Foto Fashion",
			"Buat Mockup",
			"Buat Banner",
			"Buat Carousel",
			"POV Tangan",
		],
	},
	{
		icon: (
			<svg
				className="w-6 h-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
				/>
			</svg>
		),
		iconBg: "bg-orange-100 text-orange-500",
		title: "Gaya Hidup",
		description: "Abadikan momen spesial dalam hidup Anda.",
		features: [
			"Pre-Wedding",
			"Foto Wedding",
			"Foto Maternity",
			"Foto Model",
			"Ubah Pose & Angel",
			"Fotografer Bayi & Kids",
			"Umrah / Haji",
			"Pas Foto Warna",
			"Virtual Try On",
			"Retouch",
		],
	},
	{
		icon: (
			<svg
				className="w-6 h-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
				/>
			</svg>
		),
		iconBg: "bg-pink-100 text-pink-500",
		title: "Desain & Ilustrasi",
		description: "Ubah ide menjadi karya seni visual yang memukau.",
		features: [
			"Desain Interior",
			"Desain Eksterior",
			"Sketsa Gambar",
			"Art & Karikatur",
			"Auto Rapi",
		],
	},
];

const AllFeaturesSection: React.FC = () => {
	return (
		<section className="py-12 md:py-24 bg-gray-50">
			<div className="container px-4 mx-auto">
				<div className="max-w-4xl mx-auto mb-16 text-center">
					<span className="inline-flex items-center h-6 mb-4 px-2 text-xs uppercase font-medium text-yellowGreen-700 bg-blue-200 rounded-full">
						Explorer
					</span>
					<h2 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
						Semua Fitur
					</h2>
					<p className="text-lg text-gray-500">
						Jelajahi berbagai fitur lengkap yang kami sediakan untuk kebutuhan
						kreatif Anda.
					</p>
				</div>

				{/* Category Cards Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
					{categories.map((category, index) => (
						<div
							key={index}
							className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
						>
							{/* Icon & Title */}
							<div className="flex items-center gap-3 mb-4">
								<div
									className={`w-12 h-12 rounded-xl flex items-center justify-center ${category.iconBg}`}
								>
									{category.icon}
								</div>
								<h3 className="text-lg font-bold text-gray-900">
									{category.title}
								</h3>
							</div>

							{/* Description */}
							<p className="text-sm text-gray-500 mb-5">
								{category.description}
							</p>

							{/* Feature List */}
							<ul className="space-y-2.5">
								{category.features.map((feature, featureIndex) => (
									<li key={featureIndex} className="flex items-center gap-2">
										<svg
											className="w-5 h-5 text-blue-500 shrink-0"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
										<span className="text-sm text-gray-700">{feature}</span>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Bottom Text */}
				<div className="mt-16 text-center bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
					<p className="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
						Tools Editin Foto, sekali bayar, fitur update, unlimited tanpa
						kredit limit. Support & Garansi Lifetime.
					</p>
				</div>
			</div>
		</section>
	);
};

export default AllFeaturesSection;
