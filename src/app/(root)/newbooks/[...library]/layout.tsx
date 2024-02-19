import { Flex, Heading } from '@radix-ui/themes';

export default function MonitorLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Flex direction="column">
			{children}
		</Flex>
	);
}