import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.EXTERNAL_API_KEY;

export function validateApiKey(req: NextRequest): boolean {
	const apiKey = req.headers.get("x-api-key");
	return apiKey === API_KEY;
}

export function unauthorizedResponse(): NextResponse {
	return NextResponse.json(
		{ success: false, message: "Unauthorized: Invalid API Key" },
		{ status: 401 }
	);
}
