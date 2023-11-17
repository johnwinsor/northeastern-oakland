export default function AppointmentsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="text-center min-w-full">
			{children}
		</div>
	);
}