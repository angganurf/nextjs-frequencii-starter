import { NextResponse } from "next/server";

export async function GET() {
	// Hardcoded channels based on Pakasir documentation
	// Docs C.3. Pilihan Payment Method
	const channels = [
		{
			code: "cimb_niaga_va",
			name: "CIMB Niaga Virtual Account",
			group: "Virtual Account",
			icon_url: "https://app.pakasir.com/banks/cimb_niaga_va.jpg",
			active: true,
		},
		{
			code: "bni_va",
			name: "BNI Virtual Account",
			group: "Virtual Account",
			icon_url: "https://app.pakasir.com/banks/bni_va.jpg",
			active: true,
		},
		{
			code: "qris",
			name: "QRIS",
			group: "QR Code",
			icon_url: "https://app.pakasir.com/banks/qris.jpg",
			active: true,
		},
		{
			code: "sampoerna_va",
			name: "Sampoerna Virtual Account",
			group: "Virtual Account",
			icon_url: "https://app.pakasir.com/banks/sampoerna_va.jpg",
			active: true,
		},
		{
			code: "bnc_va",
			name: "BNC Virtual Account",
			group: "Virtual Account",
			icon_url: "https://app.pakasir.com/banks/bnc_va.jpg",
			active: true,
		},
		{
			code: "maybank_va",
			name: "Maybank Virtual Account",
			group: "Virtual Account",
			icon_url: "https://app.pakasir.com/banks/maybank_va.jpg",
			active: true,
		},
		{
			code: "permata_va",
			name: "Permata Virtual Account",
			group: "Virtual Account",
			icon_url: "https://app.pakasir.com/banks/permata_va.jpg",
			active: true,
		},
		{
			code: "atm_bersama_va",
			name: "ATM Bersama",
			group: "Virtual Account",
			icon_url: "https://app.pakasir.com/banks/atm_bersama_va.jpg",
			active: true,
		},
		{
			code: "artha_graha_va",
			name: "Artha Graha Virtual Account",
			group: "Virtual Account",
			icon_url: "https://app.pakasir.com/banks/artha_graha_va.jpg",
			active: true,
		},
		{
			code: "bri_va",
			name: "BRI Virtual Account",
			group: "Virtual Account",
			icon_url: "https://app.pakasir.com/banks/bri_va.jpg",
			active: true,
		},
		{
			code: "paypal",
			name: "Paypal",
			group: "E-Wallet",
			icon_url: "https://app.pakasir.com/banks/paypal.jpg",
			active: true,
		},
	];

	return NextResponse.json({
		success: true,
		data: channels,
	});
}
