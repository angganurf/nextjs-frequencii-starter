"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/button";

import { useTranslations, useLocale } from "next-intl";

interface PaymentChannel {
	code: string;
	name: string;
	group: string;
	icon_url: string;
	active: boolean;
}

const PaymentForm: React.FC = () => {
	const t = useTranslations("PaymentForm");
	const tPayment = useTranslations("Payment");
	const [loading, setLoading] = useState(false);
	const [channels, setChannels] = useState<PaymentChannel[]>([]);
	const [selectedChannel, setSelectedChannel] = useState<string>("");
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		city: "",
	});
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// Fetch channels on mount
		const fetchChannels = async () => {
			const gateway = process.env.NEXT_PUBLIC_PAYMENT_GATEWAY || "TRIPAY";
			const endpoint =
				gateway === "PAKASIR"
					? "/api/pakasir/channels"
					: "/api/tripay/channels";

			try {
				const res = await fetch(endpoint);
				const data = await res.json();
				if (data.success && Array.isArray(data.data)) {
					setChannels(data.data);
				} else {
					console.warn("Unexpected channel data format:", data);
				}
			} catch (err) {
				console.error("Failed to fetch channels", err);
			}
		};
		fetchChannels();
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		if (!selectedChannel) {
			setError(t("selectMethodError"));
			setLoading(false);
			return;
		}

		// Gateway Switch Logic
		const gateway = process.env.NEXT_PUBLIC_PAYMENT_GATEWAY || "TRIPAY";
		const isPakasir = gateway === "PAKASIR";

		const transactionUrl = isPakasir
			? "/api/pakasir/transaction"
			: "/api/tripay/transaction";

		// Facebook Pixel: Initiate Checkout
		// @ts-ignore
		// Facebook Pixel: Initiate Checkout
		// @ts-ignore
		if (typeof window !== "undefined") {
			// @ts-ignore
			if (window.fbq) {
				// @ts-ignore
				window.fbq("track", "InitiateCheckout", {
					value: 95000,
					currency: "IDR",
				});
			}

			// TikTok Pixel: Initiate Checkout
			// @ts-ignore
			if (window.ttq) {
				// @ts-ignore
				window.ttq.track("InitiateCheckout", {
					content_id: "EDITIN-FOTO-AI-STUDIO",
					content_type: "product",
					value: 95000,
					currency: "IDR",
				});
			}
		}

		// Get FB Cookies
		const { getFbp, getFbc } = await import("@/lib/fb-utils");
		const fbp = getFbp();
		const fbc = getFbc();

		try {
			const res = await fetch(transactionUrl, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					method: selectedChannel,
					customer_name: formData.name,
					customer_email: formData.email,
					customer_phone: formData.phone,
					customer_city: formData.city,
					fbp,
					fbc,
					user_agent: navigator.userAgent,
				}),
			});

			const data = await res.json();

			if (data.success && (data.data.checkout_url || isPakasir)) {
				// Tripay returns checkout_url.
				// Pakasir (our wrapper) returns checkout_url too, but we prefer constructing it client-side
				// to avoid middleware redirect stripping query params.
				if (isPakasir && data.data.payment_details) {
					const { payment_details, reference } = data.data;
					const params = new URLSearchParams({
						order_id: reference,
						amount: payment_details.amount.toString(),
						method: payment_details.method,
						payment_number: payment_details.payment_number,
						expired_at: payment_details.expired_at,
					});
					window.location.href = `/payment/pakasir?${params.toString()}`;
				} else if (data.data.checkout_url) {
					// Ensure checkout_url doesn't have internal /id/ or /en/ if it's relative
					// Note: If checkout_url came from API (like route.ts), we must ensure that API doesn't generate it with locale too.
					window.location.href = data.data.checkout_url;
				} else {
					// Fallback if no URL (should not happen with current implementation)
					console.log("Success but no redirect URL", data);
					alert("Transaksi berhasil dibuat. Silakan cek email.");
				}
			} else {
				throw new Error(data.message || "Payment initiation failed");
			}
		} catch (err: any) {
			setError(err.message || "An unexpected error occurred.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-100 ">
			<h3 className="text-xl font-bold mb-2 text-center">{t("title")}</h3>
			<span className="inline-flex items-center italic h-auto mb-4 px-8 py-2 text-sm leading-4 font-semibold text-[#F14424] bg-red-200 rounded-full">
				{t("emailNotice")}
			</span>
			<hr className="mb-6 border-gray-200"></hr>
			{error && (
				<div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
					{error}
				</div>
			)}
			<form onSubmit={handleSubmit} className="space-y-4 text-left">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						{t("nameLabel")}
					</label>
					<input
						type="text"
						name="name"
						required
						value={formData.name}
						onChange={handleChange}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
						placeholder={t("namePlaceholder")}
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						{t("emailLabel")}
					</label>
					<input
						type="email"
						name="email"
						required
						value={formData.email}
						onChange={handleChange}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
						placeholder={t("emailPlaceholder")}
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						{t("phoneLabel")}
					</label>
					<input
						type="tel"
						name="phone"
						required
						value={formData.phone}
						onChange={handleChange}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
						placeholder={t("phonePlaceholder")}
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						{t("cityLabel")}
					</label>
					<input
						type="text"
						name="city"
						required
						value={formData.city}
						onChange={handleChange}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
						placeholder={t("cityPlaceholder")}
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						{t("paymentLabel")}
					</label>
					<div className="grid grid-cols-2 gap-2 h-auto overflow-y-auto">
						{channels.length === 0 ? (
							<p className="text-sm text-gray-400 col-span-2 text-center py-2">
								{t("loadingMethods")}
							</p>
						) : (
							channels.map((channel) => (
								<div
									key={channel.code}
									onClick={() => setSelectedChannel(channel.code)}
									className={`cursor-pointer p-2 border rounded-lg flex items-center space-x-2 transition-all ${
										selectedChannel === channel.code
											? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
											: "border-gray-200 hover:border-blue-300"
									}`}
								>
									<img
										src={channel.icon_url}
										alt={channel.name}
										className="h-6 w-auto object-contain"
									/>
									<span className="text-xs font-medium truncate">
										{channel.name}
									</span>
								</div>
							))
						)}
					</div>
				</div>

				<Button
					type="submit"
					variant="primary"
					fullWidth
					loading={loading}
					disabled={loading || channels.length === 0}
					className="mt-4"
				>
					{loading ? t("loadingBtn") : t("submitBtn")}
				</Button>

				<div className="flex justify-center items-center gap-2 mt-4 text-xs text-gray-500">
					<span className="text-green-500">
						<svg
							className="w-4 h-4"
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
					</span>
					<span>{tPayment("secure")}</span>
				</div>
			</form>
		</div>
	);
};

export default PaymentForm;
