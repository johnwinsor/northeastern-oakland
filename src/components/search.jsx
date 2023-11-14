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
            <Tabs.Trigger className="TabsTrigger" value="tab3">
                Journal Finder
            </Tabs.Trigger>
        </Tabs.List>
        < Tabs.Content className="TabsContent" value="tab1">
            <fieldset className="Fieldset">
                <input className="Input" id="name" defaultValue="Search Books..." />
            </fieldset>
            <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
                <button className="Button green">Search</button>
            </div>
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="tab2">
            <fieldset className="Fieldset">
                <input className="Input" id="name" defaultValue="Search Articles..." />
            </fieldset>
            <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
                <button className="Button green">Search</button>
            </div>
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="tab3">
            <fieldset className="Fieldset">
                <input className="Input" id="name" defaultValue="Search Journal Finder..." />
            </fieldset>
            <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
                <button className="Button green">Search</button>
            </div>
        </Tabs.Content>
    </Tabs.Root>
  );
  
  export default Search;