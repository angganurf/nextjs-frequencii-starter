import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { validateApiKey, unauthorizedResponse } from "@/lib/api-auth";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key";

interface JwtPayload {
	userId: number;
	email: string;
}

export async function GET(req: NextRequest) {
	if (!validateApiKey(req)) return unauthorizedResponse();

	try {
		// Get token from Authorization header
		const authHeader = req.headers.get("authorization");
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return NextResponse.json(
				{ error: "Authorization token required" },
				{ status: 401 }
			);
		}

		const token = authHeader.split(" ")[1];

		// Verify token
		let decoded: JwtPayload;
		try {
			decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
		} catch {
			return NextResponse.json(
				{ error: "Invalid or expired token" },
				{ status: 401 }
			);
		}

		// Find user
		const user = await prisma.user.findUnique({
			where: { id: decoded.userId },
		});

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		// Exclude password from response
		const { password, ...userWithoutPassword } = user;

		return NextResponse.json(userWithoutPassword, { status: 200 });
	} catch (error: any) {
		console.error(error);
		return NextResponse.json(
			{ error: "Error fetching profile", details: error.message },
			{ status: 500 }
		);
	}
}
