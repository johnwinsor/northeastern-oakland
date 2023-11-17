export default function MonitorLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="text-center justify-center max-h-screen">
			{children}
		</div>
	);
}