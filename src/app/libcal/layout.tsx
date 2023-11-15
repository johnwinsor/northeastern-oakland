export default function LibcalLayout({
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