export default function MonitorLayout({
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