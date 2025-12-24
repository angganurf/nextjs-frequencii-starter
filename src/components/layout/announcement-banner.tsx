/**
 * Announcement banner component
 */
const AnnouncementBanner: React.FC = () => {
	return (
		<div>
			<p className="mb-2 py-4 text-center bg-[#1a73e8] text-white">
				Waspada penipuan! Pastikan membeli app resmi Editin Foto hanya di{" "}
				<a href="https://editinfoto.site" className="underline">
					editinfoto.site
				</a>
			</p>
		</div>
	);
};

export default AnnouncementBanner;
