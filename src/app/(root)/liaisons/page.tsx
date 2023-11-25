import { Table, Container, Flex, Heading, Text} from '@radix-ui/themes'

export default function Liaisons() {
    return (
        <Container size="4">
            <Flex direction="column" pb="4">
                <Heading size="5" className='py-5'>Oakland Campus Department Liaisons</Heading>
            </Flex>
            <Flex gap="4" justify="center">
                <Table.Root className="bg-white rounded-lg shadow-xl p-4">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Division/College</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Librarian</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.RowHeaderCell>Art</Table.RowHeaderCell>
                            <Table.Cell><Flex direction="column"><Text>Rebecca Leung</Text><Text>Lawral Wornek</Text></Flex></Table.Cell>
                            <Table.Cell><Flex direction="column"><Text>r.leung@northeastern.edu</Text><Text>l.wornek@northeastern.edu</Text></Flex></Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.RowHeaderCell>Business</Table.RowHeaderCell>
                            <Table.Cell>Maura Hennessy</Table.Cell>
                            <Table.Cell>m.hennessy@northeastern.edu</Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.RowHeaderCell>Computer Science</Table.RowHeaderCell>
                            <Table.Cell>Robert Hamaker</Table.Cell>
                            <Table.Cell>r.hamaker@northeastern.edu</Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.RowHeaderCell>Education</Table.RowHeaderCell>
                            <Table.Cell>Lawral Wornek</Table.Cell>
                            <Table.Cell>l.wornek@northeastern.edu</Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.RowHeaderCell>English 1110 & 1111</Table.RowHeaderCell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.RowHeaderCell>Science and Health Science</Table.RowHeaderCell>
                            <Table.Cell>Robert Hamaker</Table.Cell>
                            <Table.Cell>r.hamaker@northeastern.edu</Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.RowHeaderCell>Social Sciences and Humanities</Table.RowHeaderCell>
                            <Table.Cell>Lawral Wornek</Table.Cell>
                            <Table.Cell>l.wornek@northeastern.edu</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table.Root>
            </Flex>
        </Container>
    )
  }