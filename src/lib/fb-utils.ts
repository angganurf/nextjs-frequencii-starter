export const getCookie = (name: string): string | null => {
	if (typeof document === "undefined") return null;
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
	return null;
};

export const getFbp = (): string | null => getCookie("_fbp");
export const getFbc = (): string | null => getCookie("_fbc");
