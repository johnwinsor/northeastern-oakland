import { Flex, Heading } from '@radix-ui/themes';

export default function MonitorLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="parent">
			{children}
		</div>
	);
}