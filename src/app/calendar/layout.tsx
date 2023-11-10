export default function CalendarLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="text-center justify-center">
			{children}
		</div>
	);
}