import { Theme } from '@radix-ui/themes';

export default function MonitorLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="bg-slate-700 h-screen">
			{children}
		</div>
	);
}