"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher() {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();

	const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const nextLocale = e.target.value;
		startTransition(async () => {
			// Call API to set cookie
			await fetch("/api/language", {
				method: "POST",
				body: JSON.stringify({ locale: nextLocale }),
			});

			// Redirect to new path
			// We need to replace the locale segment in the pathname
			const segments = pathname.split("/");
			segments[1] = nextLocale;
			const newPath = segments.join("/");

			router.replace(newPath as any, { scroll: false });
		});
	};

	return (
		<div className="relative">
			<label className="sr-only">Select Language</label>
			<select
				defaultValue={locale}
				className="appearance-none bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 py-1.5 pl-3 pr-8 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
				onChange={onSelectChange}
				disabled={isPending}
				style={{
					backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
					backgroundRepeat: "no-repeat",
					backgroundPosition: "right 0.5rem center",
					backgroundSize: "1em",
				}}
			>
				<option value="id">🇮🇩 ID</option>
				<option value="en">🇺🇸 EN</option>
			</select>
		</div>
	);
}
