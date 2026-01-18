import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// bcrypt removed - no longer needed for passwordless auth
import jwt from "jsonwebtoken";
import { validateApiKey, unauthorizedResponse } from "@/lib/api-auth";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key";

// CORS headers for external API access
const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type, Authorization, X-API-Key",
};

// Handle preflight OPTIONS request
export async function OPTIONS() {
	return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
	if (!validateApiKey(req)) {
		return NextResponse.json(
			{ error: "Unauthorized" },
			{ status: 401, headers: corsHeaders },
		);
	}

	try {
		const body = await req.json();
		const { identifier } = body; // identifier = email or username (passwordless login)

		// Validate required fields
		if (!identifier) {
			return NextResponse.json(
				{ error: "Identifier (email/username) is required" },
				{ status: 400, headers: corsHeaders },
			);
		}

		// Find user by email OR username
		const user = await prisma.user.findFirst({
			where: {
				OR: [{ email: identifier }, { username: identifier }],
			},
		});

		if (!user) {
			return NextResponse.json(
				{ error: "Invalid credentials" },
				{ status: 401, headers: corsHeaders },
			);
		}

		// Passwordless authentication - no password check required
		// Generate JWT Token
		const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
			expiresIn: "7d",
		});

		return NextResponse.json(
			{
				message: "Login successful",
				token,
				user: {
					id: user.id,
					username: user.username,
					email: user.email,
					isActive: user.isActive,
				},
			},
			{ status: 200, headers: corsHeaders },
		);
	} catch (error: any) {
		console.error(error);
		return NextResponse.json(
			{ error: "Login failed", details: error.message },
			{ status: 500, headers: corsHeaders },
		);
	}
}
