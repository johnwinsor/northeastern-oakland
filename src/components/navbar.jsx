'use client';
import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { Flex, Card } from '@radix-ui/themes'
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { CaretDownIcon } from '@radix-ui/react-icons'

export default function Navbar() {
    return (
        <Flex gap="5" className="text-sm md:text-base mt-auto">
            <NavigationMenu.Root className="NavigationMenuRoot">
                <NavigationMenu.List className="NavigationMenuList">
                    <NavigationMenu.Item>
                        <NavigationMenu.Trigger className="NavigationMenuTrigger">
                            Library Information <CaretDownIcon className="CaretDown" aria-hidden />
                        </NavigationMenu.Trigger>
                        <NavigationMenu.Content className="NavigationMenuContent">
                            <ul className="List one">
                                <li style={{ gridRow: 'span 3' }}>
                                    <NavigationMenu.Link asChild>
                                    <Card className="Callout">
                                        <svg width="38" height="38" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                        <div className="CalloutHeading">Library Information</div>
                                        <p className="CalloutText">Oakland campus-specific library policies, services and other information.</p>
                                    </Card>
                                    </NavigationMenu.Link>
                                </li>

                                <ListItem href="https://library.northeastern.edu/oakland_campus/about-the-f-w-olin-library/policies-services/" title="Policies and Services">
                                    Access policies, Borrowing, Purchase Requests, and Interlibrary Loan.
                                </ListItem>
                                <ListItem href="https://library.mills.edu/forms/questions/libanswers-embed.php" title="Questions & Feedback">
                                    Use this form to submit a new question or give us feedback.
                                </ListItem>
                                <ListItem href="https://library.northeastern.edu/administration/library-staff-directory/?ul_filter_department=F.%20W.%20Olin%20Library" title="Staff Directory">
                                    Library staff at the F.W. Olin Library on the Oakland campus.
                                </ListItem>
                            </ul>
                        </NavigationMenu.Content>
                    </NavigationMenu.Item>

                    <NavigationMenu.Item>
                    <NavigationMenu.Trigger className="NavigationMenuTrigger">
                        Faculty Resources <CaretDownIcon className="CaretDown" aria-hidden />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className="NavigationMenuContent">
                        <ul className="List two">
                            <ListItem title="Circulation & Borrowing" href="https://library.northeastern.edu/oakland_campus/about-the-f-w-olin-library/borrowing-from-the-f-w-olin-library/">
                                Where can I get library items? How Long Can I Have Library Items?
                            </ListItem>
                            <ListItem title="Copyright Policy" href="https://library.northeastern.edu/research_instruction/theses-dissertations/what-is-fair-use/">
                                What is Fair Use and when permission is required for use of a copyrighted work?
                            </ListItem>
                            <ListItem title="Interlibrary Loans" href="https://library.northeastern.edu/ideas/interlibrary-loan/">
                                About our ILL services. Signing up for an ILLiad account. Requesting items from ILL and having them delivered to the Oakland campus.
                            </ListItem>
                            <ListItem title="Course Reserves" href="https://library.mills.edu/reserves/">
                                Place physical libray materials or electronic resources on reserve for your students.
                            </ListItem>
                            <ListItem title="Departmental Liaisons" href="/liaisons">
                                Subject specialist librarians assigned to your departmenmt on the Oakland campus.
                            </ListItem>
                            <ListItem title="Purchase Requests" href="https://library.northeastern.edu/digital_production/recommend-a-purchase/">
                                Suggest a book, journal, or license for an electronic resource for purchase by the Library.
                            </ListItem>
                        </ul>
                    </NavigationMenu.Content>
                    </NavigationMenu.Item>

                    <NavigationMenu.Item>
                    <NavigationMenu.Link className="NavigationMenuLink" href="/contact">
                        Contact Us
                    </NavigationMenu.Link>
                    </NavigationMenu.Item>

                    <NavigationMenu.Item>
                    <NavigationMenu.Link className="NavigationMenuLink" href="/calendar">
                        Hours
                    </NavigationMenu.Link>
                    </NavigationMenu.Item>

                    <NavigationMenu.Item>
                    <NavigationMenu.Link className="NavigationMenuLink" href="https://github.com/radix-ui">
                        New Books
                    </NavigationMenu.Link>
                    </NavigationMenu.Item>

                    <NavigationMenu.Indicator className="NavigationMenuIndicator">
                    <div className="Arrow" />
                    </NavigationMenu.Indicator>
                </NavigationMenu.List>

                <div className="ViewportPosition">
                    <NavigationMenu.Viewport className="NavigationMenuViewport" />
                </div>
            </NavigationMenu.Root>
        </Flex>
    )
}

// eslint-disable-next-line react/display-name
const ListItem = React.forwardRef(({ className, children, title, ...props }, forwardedRef) => (
    <li>
        <NavigationMenu.Link asChild>
        <a className={classNames('ListItemLink', className)} {...props} ref={forwardedRef}>
            <div className="ListItemHeading"><Flex>{title}</Flex></div>
            <p className="ListItemText">{children}</p>
        </a>
        </NavigationMenu.Link>
    </li>
));