import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const orderId = searchParams.get("order_id");

	if (!orderId) {
		return NextResponse.json(
			{ success: false, message: "Order ID is required" },
			{ status: 400 }
		);
	}

	try {
		// Use findFirst because referenceId is not unique in schema but should be unique for us
		const transaction = await prisma.transaction.findFirst({
			where: { referenceId: orderId },
			select: { status: true },
		});

		if (!transaction) {
			return NextResponse.json(
				{ success: false, message: "Transaction not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{ success: true, data: { status: transaction.status } },
			{ status: 200 }
		);
	} catch (error: any) {
		console.error("Error fetching transaction status:", error);
		return NextResponse.json(
			{ success: false, message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
