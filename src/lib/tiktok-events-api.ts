import crypto from "crypto";

const PIXEL_ID = "D5KA6QBC77UE3GGHVH60";
const ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN;

interface TikTokUserData {
	ip?: string | null;
	user_agent?: string | null;
	email?: string | null; // hashed (SHA256)
	phone?: string | null; // hashed (SHA256)
	external_id?: string | null; // hashed (SHA256)
	ttclid?: string | null;
	ttp?: string | null;
}

interface TikTokEventData {
	event_name: string;
	event_id: string; // Deduplication ID
	event_source_url?: string;
	user_data: TikTokUserData;
	properties?: Record<string, any>; // value, currency, content_name, etc.
}

export const sendTikTokEvent = async (eventData: TikTokEventData) => {
	if (!ACCESS_TOKEN) {
		console.warn("⚠️ TIKTOK_ACCESS_TOKEN is missing. TikTok event skipped.");
		return;
	}

	const payload = {
		pixel_code: PIXEL_ID,
		event: eventData.event_name,
		event_id: eventData.event_id,
		timestamp: new Date().toISOString(),
		context: {
			ad: { callback: eventData.user_data.ttclid }, // ttclid moves here
			page: { url: eventData.event_source_url },
			user: {
				ip: eventData.user_data.ip,
				user_agent: eventData.user_data.user_agent,
			},
			user_agent: eventData.user_data.user_agent,
			ip: eventData.user_data.ip,
		},
		properties: eventData.properties,
		user: {
			// PII should be hashed
			email: eventData.user_data.email,
			phone: eventData.user_data.phone,
			external_id: eventData.user_data.external_id,
			ttp: eventData.user_data.ttp,
		},
	};

	try {
		const response = await fetch(
			"https://business-api.tiktok.com/open_api/v1.3/event/track/",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Access-Token": ACCESS_TOKEN,
				},
				body: JSON.stringify(payload),
			}
		);

		const data = await response.json();
		if (data.code !== 0) {
			console.error("❌ TikTok API Error:", data);
		} else {
			console.log(`✅ TikTok Event Sent (${eventData.event_name})`, data);
		}
		return data;
	} catch (error) {
		console.error("❌ TikTok Request Failed:", error);
	}
};

export const hashData = (data: string): string => {
	return crypto.createHash("sha256").update(data).digest("hex");
};
