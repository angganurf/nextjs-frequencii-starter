import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Skip if already has locale or is an API/asset path
	if (
		pathname.startsWith("/en") ||
		pathname.startsWith("/id") ||
		pathname.startsWith("/api") ||
		pathname.startsWith("/_next") ||
		pathname.startsWith("/images") ||
		pathname.startsWith("/favicon.ico") ||
		pathname.includes(".") // Skipping files
	) {
		return NextResponse.next();
	}

	// Check for cookie
	const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
	if (cookieLocale) {
		return NextResponse.redirect(
			new URL(`/${cookieLocale}${pathname}`, request.url)
		);
	}

	// Detect via IP
	let detectedLocale = "id";
	try {
		// Use request IP headers if available (configured for Vercel/proxies)
		let ip =
			request.headers.get("x-forwarded-for") ||
			request.headers.get("x-real-ip") ||
			"127.0.0.1";

		// Handle comma-separated IPs in x-forwarded-for
		if (ip.includes(",")) {
			ip = ip.split(",")[0].trim();
		}

		// Only check if it's a real IP and not localhost
		if (ip && ip !== "127.0.0.1" && ip !== "::1") {
			const res = await fetch(`http://ip-api.com/json/${ip}`);
			if (res.ok) {
				const data = await res.json();
				console.log("🔍 Middleware IP Detection - IP:", ip);
				console.log(
					"🔍 Middleware IP Detection - Data:",
					JSON.stringify(data, null, 2)
				);

				if (data && data.countryCode === "ID") {
					detectedLocale = "id";
				}
			} else {
				console.log("⚠️ IP-API fetch failed:", res.status, res.statusText);
			}
		}
	} catch (error) {
		console.error("IP Geolocate failed:", error);
		// Fallback to 'en' is already set
	}

	// Redirect
	const response = NextResponse.redirect(
		new URL(`/${detectedLocale}${pathname}`, request.url)
	);

	// Set cookie for future visits so we don't query API every time
	response.cookies.set("NEXT_LOCALE", detectedLocale);

	return response;
}

export const config = {
	matcher: ["/((?!api|_next|.*\\..*).*)"],
};
