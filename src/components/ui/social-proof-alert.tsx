"use client";

import React, { useState, useEffect } from "react";

// Indonesian names for random selection
const randomNames = [
	"Budi",
	"Andi",
	"Sari",
	"Dewi",
	"Rini",
	"Agus",
	"Dian",
	"Fitri",
	"Yoga",
	"Putri",
	"Rizki",
	"Wulan",
	"Fajar",
	"Maya",
	"Arif",
	"Nisa",
	"Hendra",
	"Ratna",
	"Bayu",
	"Indah",
	"Toni",
	"Lina",
	"Ahmad",
	"Sinta",
	"Dimas",
	"Ayu",
	"Kevin",
	"Rina",
	"Faisal",
	"Nadia",
];

// Random cities
const randomCities = [
	"Jakarta",
	"Bandung",
	"Surabaya",
	"Yogyakarta",
	"Semarang",
	"Malang",
	"Medan",
	"Makassar",
	"Bali",
	"Palembang",
	"Bekasi",
	"Tangerang",
	"Depok",
	"Bogor",
	"Solo",
];

const SocialProofAlert: React.FC = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [currentName, setCurrentName] = useState("");
	const [currentCity, setCurrentCity] = useState("");
	const [timeAgo, setTimeAgo] = useState("");

	const generateRandomNotification = () => {
		const name = randomNames[Math.floor(Math.random() * randomNames.length)];
		const city = randomCities[Math.floor(Math.random() * randomCities.length)];
		const minutes = Math.floor(Math.random() * 10) + 1; // 1-10 minutes ago

		setCurrentName(name);
		setCurrentCity(city);
		setTimeAgo(`${minutes} menit yang lalu`);
	};

	const showNotification = () => {
		generateRandomNotification();
		setIsVisible(true);

		// Hide after 5 seconds
		setTimeout(() => {
			setIsVisible(false);
		}, 5000);
	};

	useEffect(() => {
		// Initial delay before first notification (3-8 seconds)
		const initialDelay = Math.random() * 3000 + 5000;

		const initialTimeout = setTimeout(() => {
			showNotification();

			// Set up interval for recurring notifications
			const showNextNotification = () => {
				// Random delay between 10-15 seconds
				const randomDelay = Math.random() * 5000 + 10000;

				setTimeout(() => {
					showNotification();
					showNextNotification();
				}, randomDelay);
			};

			showNextNotification();
		}, initialDelay);

		return () => clearTimeout(initialTimeout);
	}, []);

	return (
		<div
			className={`fixed bottom-5 left-5 z-50 max-w-[320px] transition-all duration-500 ease-out ${
				isVisible
					? "opacity-100 translate-y-0 translate-x-0"
					: "opacity-0 translate-y-4 -translate-x-4 pointer-events-none"
			} max-sm:bottom-3 max-sm:left-3 max-sm:right-3 max-sm:max-w-none`}
		>
			<div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 flex items-start gap-3">
				{/* Icon */}
				<div className="shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
					<svg
						className="w-5 h-5 text-green-600"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>

				{/* Content */}
				<div className="flex-1 min-w-0">
					<p className="text-sm text-gray-800 font-medium leading-snug">
						<span className="font-bold text-gray-900">{currentName}</span> dari{" "}
						<span className="text-blue-600">{currentCity}</span> baru saja
						membeli dengan{" "}
						<span className="text-green-600 font-semibold">harga diskon</span>
					</p>
					<p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
						<svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
								clipRule="evenodd"
							/>
						</svg>
						{timeAgo}
					</p>
				</div>

				{/* Close Button */}
				<button
					onClick={() => setIsVisible(false)}
					className="shrink-0 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
					aria-label="Tutup notifikasi"
				>
					<svg
						className="w-4 h-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default SocialProofAlert;
