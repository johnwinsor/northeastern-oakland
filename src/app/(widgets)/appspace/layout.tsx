import { Theme } from '@radix-ui/themes';

export default function MonitorLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="h-full">
			
				{children}

			
		</div>
	);
}