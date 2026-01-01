// ============================================
// EDITIN FOTO - Product Data & Logic
// ============================================

// ----- PRICING -----
export const PRICING = {
	lifetime: 95000,
	originalPrice: 350000,
	currency: "IDR",
};

// ----- PRODUCT INFO -----
export const PRODUCT = {
	name: "Editin Foto",
	tagline: "Tools Editin Foto AI Professional",
	sku: "EDITIN-FOTO-001",
	type: "lifetime", // lifetime, subscription
	accessType: "unlimited",
	description:
		"Tools berbasis AI yang membantu kamu editin foto secara profesional dengan mudah dan cepat.",
};

// ----- FEATURES -----
export const FEATURES = {
	editGabung: {
		name: "Edit & Gabung",
		icon: "puzzle",
		description: "Manipulasi foto tingkat lanjut dengan sekali klik.",
		items: [
			"Gabungin Foto",
			"Foto Miniatur",
			"Perluas Foto (AI Expand)",
			"Edit Foto",
			"Perbaiki Foto (Enhance)",
			"Foto Artis",
			"Hapus BG",
		],
	},
	produkPromosi: {
		name: "Produk & Promosi",
		icon: "box",
		description: "Tingkatkan penjualan dengan visual produk profesional.",
		items: [
			"Foto Produk",
			"Foto Produk & Model",
			"Foto Fashion",
			"Buat Mockup",
			"Buat Banner",
			"Buat Carousel",
			"POV Tangan",
		],
	},
	gayaHidup: {
		name: "Gaya Hidup",
		icon: "heart",
		description: "Abadikan momen spesial dalam hidup Anda.",
		items: [
			"Pre-Wedding",
			"Foto Wedding",
			"Foto Maternity",
			"Foto Model",
			"Ubah Pose & Angle",
			"Fotografer Bayi & Kids",
			"Umrah / Haji",
			"Pas Foto Warna",
			"Virtual Try On",
			"Retouch",
		],
	},
	desainIlustrasi: {
		name: "Desain & Ilustrasi",
		icon: "palette",
		description: "Ubah ide menjadi karya seni visual yang memukau.",
		items: [
			"Desain Interior",
			"Desain Eksterior",
			"Sketsa Gambar",
			"Art & Karikatur",
			"Auto Rapi",
		],
	},
};

// ----- FAQ -----
export const FAQ = [
	{
		question: "Apa itu Editin Foto?",
		answer:
			"Editin Foto adalah tools berbasis AI yang membantu kamu editin foto secara profesional dengan mudah dan cepat. Mulai dari foto produk, portrait, hingga desain interior - semua bisa dilakukan dalam hitungan detik.",
	},
	{
		question: "Apakah benar sekali bayar untuk selamanya?",
		answer:
			"Ya! Dengan sekali pembayaran Rp 95.000, kamu mendapatkan akses selamanya ke semua fitur. Tidak ada biaya bulanan atau tahunan. Plus, semua update fitur di masa depan juga gratis!",
	},
	{
		question: "Apakah ada batasan penggunaan?",
		answer:
			"Tidak ada! Kamu bisa menggunakan semua fitur sepuasnya, kapan saja, tanpa batasan jumlah foto yang diedit.",
	},
	{
		question: "Bagaimana cara menggunakan Editin Foto?",
		answer:
			"Gampang banget! Setelah bayar, akses dikirim otomatis ke email kamu. Tinggal login, upload foto, dan biarkan AI yang kerja.",
	},
	{
		question: "Apakah foto saya aman?",
		answer:
			"Ya, kami menjaga privasi dan keamanan foto Anda. Semua foto yang diupload hanya digunakan untuk proses editing dan tidak dibagikan ke pihak lain.",
	},
	{
		question: "Metode pembayaran apa saja yang tersedia?",
		answer:
			"Transfer Bank (Virtual Account), E-Wallet (OVO, DANA, ShopeePay), dan QRIS.",
	},
	{
		question: "Bagaimana cara menghubungi support?",
		answer:
			"Hubungi tim support kami melalui WhatsApp di 085770044691. Tim kami siap membantu 24/7.",
	},
	{
		question: "Apakah bisa refund?",
		answer:
			"Tidak bisa refund karena akses sudah diberikan termasuk semua update-nya.",
	},
];

// ----- BENEFITS -----
export const BENEFITS = [
	{ icon: "💰", text: "Sekali Bayar - Tidak ada biaya bulanan/tahunan" },
	{ icon: "♾️", text: "Akses Selamanya - Lifetime access" },
	{ icon: "🆓", text: "Update Gratis - Semua fitur baru GRATIS" },
	{ icon: "🚀", text: "Tanpa Limit - Unlimited penggunaan" },
	{ icon: "👶", text: "Mudah Digunakan - Tanpa skill editing ribet" },
	{ icon: "📞", text: "Support 24/7 - Tim support siap membantu" },
];

// ----- CONTACT -----
export const CONTACT = {
	whatsapp: "6285770044691",
	whatsappDisplay: "085770044691",
	website: "https://editinfoto.site",
	supportHours: "24/7",
};

// ----- PAYMENT METHODS -----
export const PAYMENT_METHODS = {
	bank: ["BCA", "BNI", "BRI", "Mandiri", "Permata"],
	ewallet: ["OVO", "DANA", "ShopeePay"],
	other: ["QRIS"],
};

// ----- UTILITY FUNCTIONS -----

/**
 * Format price to Indonesian Rupiah
 */
export function formatPrice(price: number): string {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(price);
}

/**
 * Calculate discount percentage
 */
export function getDiscountPercentage(): number {
	const { lifetime, originalPrice } = PRICING;
	return Math.round(((originalPrice - lifetime) / originalPrice) * 100);
}

/**
 * Get savings amount
 */
export function getSavingsAmount(): number {
	return PRICING.originalPrice - PRICING.lifetime;
}

/**
 * Get all features as flat array
 */
export function getAllFeatures(): string[] {
	return Object.values(FEATURES).flatMap((category) => category.items);
}

/**
 * Get total feature count
 */
export function getTotalFeatureCount(): number {
	return getAllFeatures().length;
}

/**
 * Find FAQ by keyword
 */
export function findFAQ(keyword: string): typeof FAQ {
	const lowerKeyword = keyword.toLowerCase();
	return FAQ.filter(
		(item) =>
			item.question.toLowerCase().includes(lowerKeyword) ||
			item.answer.toLowerCase().includes(lowerKeyword)
	);
}

/**
 * Generate WhatsApp link with message
 */
export function getWhatsAppLink(message?: string): string {
	const defaultMessage = "Halo, saya ingin bertanya tentang Editin Foto";
	const encodedMessage = encodeURIComponent(message || defaultMessage);
	return `https://wa.me/${CONTACT.whatsapp}?text=${encodedMessage}`;
}

/**
 * Get price display string
 */
export function getPriceDisplay(): {
	current: string;
	original: string;
	discount: string;
	savings: string;
} {
	return {
		current: formatPrice(PRICING.lifetime),
		original: formatPrice(PRICING.originalPrice),
		discount: `${getDiscountPercentage()}%`,
		savings: formatPrice(getSavingsAmount()),
	};
}
