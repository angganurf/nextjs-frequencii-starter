import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey, unauthorizedResponse } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
	if (!validateApiKey(req)) return unauthorizedResponse();

	const { searchParams } = new URL(req.url);
	const userId = searchParams.get("userId");

	try {
		const whereClause = userId ? { userId: Number(userId) } : {};

		const transactions = await prisma.transaction.findMany({
			where: whereClause,
			orderBy: { createdAt: "desc" },
			take: 50, // Limit to 50 for safety
		});

		return NextResponse.json(
			{ success: true, data: transactions },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ success: false, message: error.message },
			{ status: 500 }
		);
	}
}
