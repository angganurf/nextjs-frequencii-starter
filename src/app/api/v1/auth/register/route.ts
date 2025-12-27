import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateApiKey, unauthorizedResponse } from "@/lib/api-auth";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key";

export async function POST(req: NextRequest) {
	if (!validateApiKey(req)) return unauthorizedResponse();

	try {
		const body = await req.json();
		const { username, email, password, fullName, address } = body;

		// Validate required fields
		if (!username || !email || !password) {
			return NextResponse.json(
				{ error: "Username, email, and password are required" },
				{ status: 400 }
			);
		}

		// Check if user exists (by email OR username)
		const existingUser = await prisma.user.findFirst({
			where: {
				OR: [{ email: email }, { username: username }],
			},
		});

		if (existingUser) {
			return NextResponse.json(
				{ error: "Username or Email already exists" },
				{ status: 400 }
			);
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create user
		const user = await prisma.user.create({
			data: {
				username,
				email,
				password: hashedPassword,
				fullName: fullName || null,
				address: address || null,
				isActive: false, // Default inactive
			},
		});

		// Generate JWT Token
		const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
			expiresIn: "7d",
		});

		return NextResponse.json(
			{
				message: "User created",
				token,
				user: {
					id: user.id,
					username: user.username,
					email: user.email,
				},
			},
			{ status: 201 }
		);
	} catch (error: any) {
		console.error(error);
		return NextResponse.json(
			{ error: "Registration failed", details: error.message },
			{ status: 500 }
		);
	}
}
