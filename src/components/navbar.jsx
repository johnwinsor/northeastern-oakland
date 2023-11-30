'use client';
import React from 'react';
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CaretDownIcon, ExternalLinkIcon } from '@radix-ui/react-icons'
import { Flex, Card, Text } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css';
import './css/navbar.css';

const info = [
    { name: 'Policies and Services', description: 'Access policies, Borrowing, Purchase Requests, and Interlibrary Loan.', href: 'https://library.northeastern.edu/oakland_campus/about-the-f-w-olin-library/policies-services/', icon: ExternalLinkIcon },
    { name: 'Questions & Feedback', description: 'Use this form to submit a new question or give us feedback.', href: 'https://library.mills.edu/forms/questions/libanswers-embed.php', icon: CursorArrowRaysIcon },
    { name: 'Staff Directory', description: 'Library staff at the F.W. Olin Library on the Oakland campus.', href: 'https://library.northeastern.edu/administration/library-staff-directory/?ul_filter_department=F.%20W.%20Olin%20Library', icon: FingerPrintIcon },
]

const faculty = [
    { name: 'Policies and Services', description: 'Access policies, Borrowing, Purchase Requests, and Interlibrary Loan.', href: 'https://library.northeastern.edu/oakland_campus/about-the-f-w-olin-library/policies-services/', icon: ChartPieIcon },
    { name: 'Questions & Feedback', description: 'Use this form to submit a new question or give us feedback.', href: 'https://library.mills.edu/forms/questions/libanswers-embed.php', icon: CursorArrowRaysIcon },
    { name: 'Staff Directory', description: 'Library staff at the F.W. Olin Library on the Oakland campus.', href: 'https://library.northeastern.edu/administration/library-staff-directory/?ul_filter_department=F.%20W.%20Olin%20Library', icon: FingerPrintIcon },
  ]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="bg-teal-50 z-50 pl-1">
            <Flex gap="3" className="text-sm md:text-base mt-auto">
                <div className="flex md:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                        >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-10 w-10" aria-hidden="true" />
                    </button>
                </div>
                <NavigationMenu.Root className="NavigationMenuRoot hidden md:flex md:gap-x-12">
                    <NavigationMenu.List className="NavigationMenuList">
                        <NavigationMenu.Item>
                            <NavigationMenu.Trigger className="NavigationMenuTrigger">
                                Library Information <CaretDownIcon className="CaretDown" aria-hidden />
                            </NavigationMenu.Trigger>
                            <NavigationMenu.Content className="NavigationMenuContent">
                                <ul className="List one">
                                    {/* <li style={{ gridRow: 'span 5' }}>
                                        <NavigationMenu.Link asChild>
                                        <Card className="Callout">
                                            <svg width="38" height="38" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                            <div className="CalloutHeading">Library Information</div>
                                            <p className="CalloutText">Oakland campus-specific library policies, services and other information.</p>
                                        </Card>
                                        </NavigationMenu.Link>
                                    </li> */}

                                    <ListItem href="/calendar" title="Library Hours">
                                        <Flex gap="4">
                                            Hours of operation for the main F.W. Olin Library and the Heller Rare Books Room.
                                        </Flex>
                                    </ListItem>

                                    <ListItem target="_blank" external title="Circulation & Borrowing" href="https://library.northeastern.edu/oakland_campus/about-the-f-w-olin-library/borrowing-from-the-f-w-olin-library/">
                                        <Flex gap="4">
                                            Where can I get library items? How long can I have library items?
                                        </Flex>
                                    </ListItem>
                                    
                                    <ListItem href="https://library.northeastern.edu/oakland_campus/about-the-f-w-olin-library/policies-services/" title="Policies and Services" target="_blank" external>
                                        <Flex gap="4">
                                            Access policies, Borrowing, Purchase Requests, and Interlibrary Loan.
                                        </Flex>
                                    </ListItem>
                            
                                    <ListItem href="https://library.northeastern.edu/research_instruction/ask-a-librarian/email-the-library/" title="Questions & Feedback" target="_blank" external>
                                        Have a question or a suggestion? Use this form to email  or give us feedback.
                                    </ListItem>
                                    <ListItem href="https://library.northeastern.edu/administration/library-staff-directory/?ul_filter_department=F.%20W.%20Olin%20Library" title="Staff Directory" target="_blank" external>
                                        Directory listings for library staff at the F.W. Olin Library on the Oakland campus.
                                    </ListItem>
                                    <ListItem href="/newbooks" title="New Books">
                                        New Arrivals.
                                    </ListItem>
                                </ul>
                            </NavigationMenu.Content>
                        </NavigationMenu.Item>

                        <NavigationMenu.Item>
                            <NavigationMenu.Trigger className="NavigationMenuTrigger">
                                Student Resources <CaretDownIcon className="CaretDown" aria-hidden />
                            </NavigationMenu.Trigger>
                            <NavigationMenu.Content className="NavigationMenuContent">
                                <ul className="List two">
                                    <ListItem target="_blank" external title="Databases" href="https://subjectguides.lib.neu.edu/az.php">
                                        Electronic resources that are available to all current Northeastern students, faculty, and staff.
                                    </ListItem>
                                    
                                    <ListItem target="_blank" external title="Interlibrary Loan" href="https://library.northeastern.edu/oakland_campus/about-the-f-w-olin-library/interlibrary-loan-document-delivery-requests/">
                                        Sign up for an ILLiad account. Request items to be delivered to the Oakland campus.
                                    </ListItem>
                                    
                                    <ListItem target="_blank" external title="Subject Guides" href="https://subjectguides.lib.neu.edu/">
                                        Browse librarian curated pages based on subjects or topic specific resources.
                                    </ListItem>
                                    
                                    <ListItem target="_blank" external title="Citations & Bibliographies" href="https://subjectguides.lib.neu.edu/Citations">
                                        Collect, organize and format citations according to frequently used style guides such as APA and MLA
                                    </ListItem>
                                    
                                    <ListItem title="Study Rooms" href="/libcal">
                                        Reserve a study room in the library for a group of up to 6 people.
                                    </ListItem>
                                    
                                    <ListItem target="_blank" external title="Purchase Requests" href="https://library.northeastern.edu/digital_production/recommend-a-purchase/">
                                        Suggest a book, journal, or license for an electronic resource for purchase by the Library.
                                    </ListItem>
                                </ul>
                            </NavigationMenu.Content>
                        </NavigationMenu.Item>
                        
                        <NavigationMenu.Item>
                            <NavigationMenu.Trigger className="NavigationMenuTrigger">
                                Faculty Resources <CaretDownIcon className="CaretDown" aria-hidden />
                            </NavigationMenu.Trigger>
                            <NavigationMenu.Content className="NavigationMenuContent">
                                <ul className="List three">
                                    <ListItem target="_blank" external title="Copyright Policy" href="https://library.northeastern.edu/research_instruction/theses-dissertations/what-is-fair-use/">
                                        What is Fair Use and when is permission required for use of a copyrighted work?
                                    </ListItem>

                                    <ListItem target="_blank" external title="Interlibrary Loans" href="https://library.northeastern.edu/ideas/interlibrary-loan/">
                                        Sign up for an ILLiad account. Request items to be delivered to the Oakland campus.
                                    </ListItem>

                                    <ListItem target="_blank" external title="Course Reserves" href="https://library.northeastern.edu/ideas/course-reserves/course-reserves-information-for-faculty/#oakland-faculty">
                                        Place physical libray materials or electronic resources on reserve for your students.
                                    </ListItem>

                                    <ListItem title="Departmental Liaisons" href="/liaisons">
                                        Subject specialist librarians assigned to your departmenmt on the Oakland campus.
                                    </ListItem>

                                    <ListItem target="_blank" external title="Purchase Requests" href="https://library.northeastern.edu/digital_production/recommend-a-purchase/">
                                        Suggest a book, journal, or license for an electronic resource for purchase by the Library.
                                    </ListItem>

                                    <ListItem target="_blank" external title="Information Literacy Instruction" href="https://library.northeastern.edu/research_instruction/teaching-learning/request-a-class-or-workshop/">
                                        Request a library session or workshop or contact a subject librarian directly to discuss your instruction needs.
                                    </ListItem>
                                </ul>
                            </NavigationMenu.Content>
                        </NavigationMenu.Item>

                        <NavigationMenu.Item>
                            <NavigationMenu.Link className="NavigationMenuLink" href="https://library.northeastern.edu/oakland_campus/about-the-f-w-olin-library/special-collections/" target="_blank">
                                Special Collections
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>

                        <NavigationMenu.Item>
                            <NavigationMenu.Link className="NavigationMenuLink" href="/contact">
                                Contact Us
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>

                        {/* <NavigationMenu.Item>
                        <NavigationMenu.Link className="NavigationMenuLink" href="/calendar">
                            Hours
                        </NavigationMenu.Link>
                        </NavigationMenu.Item> */}

                        {/* <NavigationMenu.Item>
                        <NavigationMenu.Link className="NavigationMenuLink" href="https://library.mills.edu/newbooks/alma-newbooks.php">
                            New Books
                        </NavigationMenu.Link>
                        </NavigationMenu.Item> */}

                        <NavigationMenu.Indicator className="NavigationMenuIndicator">
                            <div className="Arrow" />
                        </NavigationMenu.Indicator>
                    </NavigationMenu.List>

                    <div className="ViewportPosition">
                        <NavigationMenu.Viewport className="NavigationMenuViewport" />
                    </div>
                </NavigationMenu.Root>
                {/* <Popover.Group className="hidden lg:flex lg:gap-x-12">
                    <Popover className="relative">
                    <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                        Product
                        <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                    </Popover.Button>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                        <div className="p-4">
                            {products.map((item) => (
                            <div
                                key={item.name}
                                className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                            >
                                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                </div>
                                <div className="flex-auto">
                                <a href={item.href} className="block font-semibold text-gray-900">
                                    {item.name}
                                    <span className="absolute inset-0" />
                                </a>
                                <p className="mt-1 text-gray-600">{item.description}</p>
                                </div>
                            </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                            {callsToAction.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                            >
                                <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                                {item.name}
                            </a>
                            ))}
                        </div>
                        </Popover.Panel>
                    </Transition>
                    </Popover>

                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                    Features
                    </a>
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                    Marketplace
                    </a>
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                    Company
                    </a>
                </Popover.Group> */}
                {/* <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                    Log in <span aria-hidden="true">&rarr;</span>
                    </a>
                </div> */}
            </Flex>
            <Dialog as="div" className="md:hidden p-1" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <button
                        type="button"
                        className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(false)}
                        >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                        <div className="space-y-2 py-6">
                            <Disclosure as="div" className="-mx-3">
                            {({ open }) => (
                                <>
                                <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                    Library Information
                                    <ChevronDownIcon
                                    className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                                    aria-hidden="true"
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="mt-2 space-y-2">
                                    {[...info].map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                    ))}
                                </Disclosure.Panel>
                                </>
                            )}
                            </Disclosure>

                            <Disclosure as="div" className="-mx-3">
                            {({ open }) => (
                                <>
                                <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                    Faculty Resources
                                    <ChevronDownIcon
                                    className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                                    aria-hidden="true"
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="mt-2 space-y-2">
                                    {[...faculty].map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        {item.name}
                                        {/* <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" /> */}
                                    </Disclosure.Button>
                                    ))}
                                </Disclosure.Panel>
                                </>
                            )}
                            </Disclosure>

                            <a
                            href="/contact"
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                            Contact Us
                            </a>
                            <a
                            href="/calendar"
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                            Hours
                            </a>
                            <a
                            href="#"
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                            New Books
                            </a>
                        </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}

// eslint-disable-next-line react/display-name
const ListItem = React.forwardRef(({ className, children, title, external, ...props }, forwardedRef) => (
    <li>
        <NavigationMenu.Link asChild>
        <a className={classNames('ListItemLink', className)} {...props} ref={forwardedRef}>
            <div className="ListItemHeading"><Flex>{title}{external ? <ExternalLinkIcon className="mt-0.5 ml-0.5" /> : null}</Flex></div>
            <Text className="ListItemText">{children}</Text>
        </a>
        </NavigationMenu.Link>
    </li>
));
