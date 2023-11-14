'use client';
import React from 'react';
import { Badge, Card, Container, Flex, Heading, Text} from '@radix-ui/themes'
import * as Tabs from '@radix-ui/react-tabs';

import './search.css';


const Search = () => (
    <Tabs.Root className="TabsRoot" defaultValue="tab1">
        <Card>
            <Heading size="5" className='py-1'>Scholar One Search</Heading>
            <Text>Search for Books, Articles, Videos, and other Library Materials</Text>
        </Card>
        <Tabs.List className="TabsList" aria-label="Manage your account">
            <Tabs.Trigger className="TabsTrigger" value="tab1">
                Search Books
            </Tabs.Trigger>
            <Tabs.Trigger className="TabsTrigger" value="tab2">
                Search Articles
            </Tabs.Trigger>
        </Tabs.List>
        < Tabs.Content className="TabsContent" value="tab1">
            <fieldset className="Fieldset">
                <input className="Input" id="name" defaultValue="Search..." />
            </fieldset>
            <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
                <button className="Button green">Search</button>
            </div>
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="tab2">
            <p className="Text">Change your password here. After saving, you'll be logged out.</p>
            <fieldset className="Fieldset">
                <label className="Label" htmlFor="currentPassword">
                    Current password
                </label>
                 <input className="Input" id="currentPassword" type="password" />
            </fieldset>
            <fieldset className="Fieldset">
                <label className="Label" htmlFor="newPassword">
                    New password
                </label>
                <input className="Input" id="newPassword" type="password" />
            </fieldset>
            <fieldset className="Fieldset">
                <label className="Label" htmlFor="confirmPassword">
                    Confirm password
                </label>
                <input className="Input" id="confirmPassword" type="password" />
            </fieldset>
            <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
                <button className="Button green">Change password</button>
            </div>
        </Tabs.Content>
    </Tabs.Root>
  );
  
  export default Search;