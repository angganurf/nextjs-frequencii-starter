import React from "react";

interface FeatureItem {
	title: string;
	isNew?: boolean;
}

const features: FeatureItem[] = [
	{ title: "Gabungin Foto" },
	{ title: "Foto Produk" },
	{ title: "Foto Model" },
	{ title: "Editin Foto" },
	{ title: "Perbaiki Foto" },
	{ title: "Edit Banner" },
	{ title: "Foto Fashion" },
	{ title: "Edit Carousel" },
	{ title: "Foto Prewedding" },
	{ title: "Foto Wedding" },
	{ title: "Baby Born Foto" },
	{ title: "Kids Foto" },
	{ title: "Foto Umrah/Haji" },
	{ title: "Pas Foto" },
	{ title: "Foto Maternity", isNew: true },
	{ title: "Desain Interior" },
	{ title: "Desain Eksterior" },
	{ title: "Sketsa Gambar" },
	{ title: "Art & Karikatur" },
	{ title: "Virtual Try On", isNew: true },
	{ title: "Ubah Angle Kamera", isNew: true },
	{ title: "Auto Rapi", isNew: true },
	{ title: "Foto Artis", isNew: true },
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

				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{features.map((feature, index) => (
						<div
							key={index}
							className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 border border-transparent hover:border-gray-100 group"
						>
							<div className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M5 13l4 4L19 7"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
							<span className="font-medium text-gray-700 group-hover:text-gray-900">
								{feature.title}
							</span>
							{feature.isNew && (
								<span className="ml-2 inline-block py-0.5 px-1.5 text-[10px] font-bold text-white bg-red-500 rounded-full uppercase tracking-wider">
									New
								</span>
							)}
						</div>
					))}
				</div>
				<div className="mt-18 text-center">
					<p className="text-xl font-bold bg-linear-to-r from-red-600 via-orange-500 via-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
						Tools Editin Foto, sekali bayar, fitur update, unlimited tanpa
						kredit limit. Support & Garansi Lifetime.
					</p>
				</div>
			</div>
		</section>
	);
};

export default AllFeaturesSection;
