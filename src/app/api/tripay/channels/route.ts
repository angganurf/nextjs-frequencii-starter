import { NextResponse } from "next/server";

export async function GET() {
	const apiKey = process.env.TRIPAY_API_KEY;
	const apiUrl = process.env.TRIPAY_API_URL;

	if (!apiKey || !apiUrl) {
		return NextResponse.json(
			{ success: false, message: "Server configuration error" },
			{ status: 500 }
		);
	}

	try {
		const response = await fetch(`${apiUrl}merchant/payment-channel`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${apiKey}`,
			},
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message || "Failed to fetch channels");
		}

		return NextResponse.json(data);
	} catch (error: any) {
		console.error("Tripay API Error:", error);
		return NextResponse.json(
			{ success: false, message: error.message },
			{ status: 500 }
		);
	}
}
