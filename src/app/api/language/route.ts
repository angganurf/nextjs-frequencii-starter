import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
	const cookieStore = await cookies();
	const locale = cookieStore.get("NEXT_LOCALE")?.value || "id";
	return NextResponse.json({ locale });
}

export async function POST(request: Request) {
	try {
		const { locale } = await request.json();

		if (!["en", "id"].includes(locale)) {
			return NextResponse.json(
				{ success: false, message: "Invalid locale" },
				{ status: 400 }
			);
		}

		const cookieStore = await cookies();
		// Set cookie
		cookieStore.set("NEXT_LOCALE", locale);

		return NextResponse.json({ success: true, locale });
	} catch (error) {
		return NextResponse.json(
			{ success: false, message: "Error setting language" },
			{ status: 500 }
		);
	}
}
