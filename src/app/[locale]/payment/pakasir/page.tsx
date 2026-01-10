"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/button";

export default function PakasirPaymentPage() {
	const t = useTranslations("PakasirPayment");
	const searchParams = useSearchParams();
	const [mounted, setMounted] = useState(false);
	const [status, setStatus] = useState("PENDING");

	useEffect(() => {
		setMounted(true);
	}, []);

	const orderId = searchParams.get("order_id");
	const amount = parseInt(searchParams.get("amount") || "0");
	const method = searchParams.get("method");
	const paymentNumber = searchParams.get("payment_number");
	const expiredAt = searchParams.get("expired_at");

	const checkPaymentStatus = async (isManual = false) => {
		if (!orderId) return;
		try {
			const res = await fetch(`/api/transaction/status?order_id=${orderId}`);
			const data = await res.json();
			if (data.success && data.data.status === "PAID") {
				setStatus("PAID");
			} else if (isManual) {
				alert(t("paymentPending"));
			}
		} catch (error) {
			console.error("Error checking status:", error);
			if (isManual) alert(t("checkError"));
		}
	};

	// Polling for status
	useEffect(() => {
		if (!orderId || status === "PAID") return;

		// Immediate check on load/update
		checkPaymentStatus(false);

		const interval = setInterval(() => checkPaymentStatus(false), 5000);
		return () => clearInterval(interval);
	}, [orderId, status]);

	if (!mounted) return null;

	// Success View
	if (status === "PAID") {
		return (
			<div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4">
				<div className="bg-white max-w-md w-full rounded-2xl shadow-xl overflow-hidden p-8 text-center space-y-6">
					<div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<svg
							className="w-10 h-10 text-green-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
					<h1 className="text-2xl font-bold text-gray-900">
						{t("successTitle")}
					</h1>
					<p className="text-gray-600">{t("successMessage")}</p>
					<div className="bg-blue-50 p-4 rounded-lg">
						<p className="text-sm text-blue-800">{t("successNote")}</p>
					</div>
					<Link
						href={"/" as any}
						className="inline-block w-full bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-blue-700 transition"
					>
						{t("backHome")}
					</Link>
				</div>
			</div>
		);
	}

	// Formatting
	const formattedAmount = new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	}).format(amount);

	const formattedExpired = expiredAt
		? new Date(expiredAt).toLocaleString("id-ID")
		: "-";

	const isQRIS = method === "qris";

	// Copy to clipboard
	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		alert(t("copySuccess"));
	};

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
			<div className="bg-white max-w-md w-full rounded-2xl shadow-xl overflow-hidden">
				{/* Header */}
				<div className="bg-blue-600 p-6 text-center text-white">
					<h1 className="text-2xl font-bold mb-2">{t("title")}</h1>
					<p className="opacity-90">{t("subtitle")}</p>
				</div>

				{/* Body */}
				<div className="p-6 space-y-6">
					{/* Order Info */}
					<div className="flex justify-between items-center border-b border-gray-100 pb-4">
						<span className="text-gray-500">{t("orderId")}</span>
						<span className="font-mono font-medium">{orderId}</span>
					</div>
					<div className="flex justify-between items-center border-b border-gray-100 pb-4">
						<span className="text-gray-500">{t("total")}</span>
						<span className="text-xl font-bold text-blue-600">
							{formattedAmount}
						</span>
					</div>
					<div className="flex justify-between items-center border-b border-gray-100 pb-4">
						<span className="text-gray-500">{t("expiry")}</span>
						<span className="text-sm font-medium text-red-500">
							{formattedExpired}
						</span>
					</div>

					{/* Payment Method Details */}
					<div className="bg-blue-50 p-6 rounded-xl text-center">
						<h3 className="text-lg font-semibold mb-4 text-blue-900 uppercase">
							{method?.replace(/_/g, " ")}
						</h3>

						{isQRIS && paymentNumber ? (
							<div className="flex flex-col items-center space-y-4">
								<p className="text-sm text-blue-700 mb-2">{t("scanQr")}</p>
								<div className="bg-white p-2 rounded-lg shadow-sm">
									{/* Use generic QR API */}
									<img
										src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
											paymentNumber
										)}`}
										alt="QRIS Code"
										width={250}
										height={250}
										className="rounded-md"
									/>
								</div>
							</div>
						) : (
							<div className="text-center space-y-4">
								<p className="text-sm text-blue-700">{t("vaLabel")}</p>
								<div
									className="text-2xl font-mono font-bold bg-white p-4 rounded-lg border border-blue-200 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 group"
									onClick={() => copyToClipboard(paymentNumber || "")}
								>
									<span>{paymentNumber}</span>
									<span className="text-gray-400 group-hover:text-blue-500">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
											<path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
										</svg>
									</span>
								</div>
								<p className="text-xs text-blue-500">{t("copy")}</p>
							</div>
						)}
					</div>

					{/* Action */}
					<div className="pt-4">
						<div
							onClick={() => checkPaymentStatus(true)}
							className="block w-full text-center text-sm text-gray-500 hover:text-gray-900 underline cursor-pointer"
						>
							{t("checkStatus")}
						</div>
						<p className="text-xs text-center text-gray-400 mt-4">
							{t("note")}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
