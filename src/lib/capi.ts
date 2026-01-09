import crypto from "crypto";

const PIXEL_ID = "1257527596434066";
const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN; // Ensure this is in your .env

interface UserData {
	client_ip_address?: string | null;
	client_user_agent?: string | null;
	fbp?: string | null;
	fbc?: string | null;
	em?: string | null; // hashed email
	ph?: string | null; // hashed phone
	fn?: string | null; // hashed first name
	ln?: string | null; // hashed last name
	ct?: string | null; // hashed city
	st?: string | null; // hashed state
	zp?: string | null; // hashed zip
	country?: string | null; // hashed country
	external_id?: string | null; // hashed external id
}

interface CustomData {
	currency?: string;
	value?: number;
	content_name?: string;
	[key: string]: any;
}

interface EventData {
	event_name: string;
	event_id: string; // Deduplication ID
	event_source_url?: string;
	user_data: UserData;
	custom_data?: CustomData;
}

export const sendCapiEvent = async (eventData: EventData) => {
	if (!ACCESS_TOKEN) {
		console.warn("⚠️ FB_ACCESS_TOKEN is missing. CAPI event skipped.");
		return;
	}

	const payload = {
		data: [
			{
				event_name: eventData.event_name,
				event_time: Math.floor(Date.now() / 1000),
				action_source: "website",
				event_id: eventData.event_id,
				event_source_url: eventData.event_source_url,
				user_data: {
					client_ip_address: eventData.user_data.client_ip_address,
					client_user_agent: eventData.user_data.client_user_agent,
					fbp: eventData.user_data.fbp,
					fbc: eventData.user_data.fbc,
					em: eventData.user_data.em,
					ph: eventData.user_data.ph,
					fn: eventData.user_data.fn,
					ln: eventData.user_data.ln,
					ct: eventData.user_data.ct,
					st: eventData.user_data.st,
					zp: eventData.user_data.zp,
					country: eventData.user_data.country,
					external_id: eventData.user_data.external_id,
				},
				custom_data: eventData.custom_data,
			},
		],
	};

	try {
		const response = await fetch(
			`https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			}
		);

		const data = await response.json();
		if (!response.ok) {
			console.error("❌ CAPI Error:", data);
		} else {
			console.log(`✅ CAPI Event Sent (${eventData.event_name})`, data);
		}
		return data;
	} catch (error) {
		console.error("❌ CAPI Request Failed:", error);
	}
};

export const hashData = (data: string): string => {
	return crypto.createHash("sha256").update(data).digest("hex");
};
