'use client';
import React from 'react';
import { Badge, Card, Container, Flex, Heading, Text, TextField} from '@radix-ui/themes'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import * as Tabs from '@radix-ui/react-tabs';
import './search.css';

const searchPrimo = () => {
    document.getElementById("primoQuery").value = "any,contains," + document.getElementById("primoQueryTemp").value;
    document.forms["searchForm"].submit();
}

const clearField = () => {
    const field = document.getElementById("primoQueryTemp");
    field.value = "";
}


const Search = () => (
    <Tabs.Root className="TabsRoot" defaultValue="tab1">
        <Card>
            <Heading size="5" className='py-1'>Scholar One Search</Heading>
            <Text className="hidden md:block">Search for Books, Articles, Videos, and other Library Materials</Text>
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
            <form id="simple" name="searchForm" method="get" target="_self" action="https://onesearch.library.northeastern.edu/discovery/search" encType="application/x-www-form-urlencoded; charset=utf-8">
                <input type="hidden" name="vid" value="01NEU_INST:NU_Olin" />
                <input type="hidden" name="tab" value="Everything" />
                <input type="hidden" name="search_scope" value="MillsCatalog" />
                <input type="hidden" name="query" id="primoQuery" />
                <fieldset className="Fieldset">
                    {/* <input type="text" className="Input" id="primoQueryTemp" defaultValue="Search Books..." onClick={clearField} /> */}
                    <TextField.Root>
                        <TextField.Slot>
                            <MagnifyingGlassIcon height="16" width="16" />
                        </TextField.Slot>
                        <TextField.Input size="3" id="primoQueryTemp" placeholder="Search Books..." onClick={clearField} />
                    </TextField.Root>
                </fieldset>
                <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
                    <button type="submit" className="Button green" onClick={searchPrimo}>Search</button>
                </div>
            </form>
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="tab2">
            <form id="simple" name="searchForm" method="get" target="_self" action="https://onesearch.library.northeastern.edu/discovery/search" encType="application/x-www-form-urlencoded; charset=utf-8">
                <input type="hidden" name="vid" value="01NEU_INST:NU_Olin" />
                <input type="hidden" name="tab" value="Everything" />
                <input type="hidden" name="search_scope" value="Mills_and_CI" />
                <input type="hidden" name="query" id="primoQuery" />
                <fieldset className="Fieldset">
                    {/* <input type="text" className="Input" id="primoQueryTemp" defaultValue="Search Articles..." onClick={clearField} /> */}
                    <TextField.Root>
                        <TextField.Slot>
                            <MagnifyingGlassIcon height="16" width="16" />
                        </TextField.Slot>
                        <TextField.Input size="3" id="primoQueryTemp" placeholder="Search Articles..." onClick={clearField} />
                    </TextField.Root>
                </fieldset>
                <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
                    <button type="submit" className="Button green" onClick={searchPrimo}>Search</button>
                </div>
            </form>
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="tab3">
        <form id="simple" name="searchForm" method="get" target="_self" action="https://onesearch.library.northeastern.edu/discovery/jsearch" encType="application/x-www-form-urlencoded; charset=utf-8">
                <input type="hidden" name="vid" value="01NEU_INST:NU_Olin" />
                <input type="hidden" name="tab" value="jsearch_slot" />
                <input type="hidden" name="search_scope" value="Mills_and_CI" />
                <input type="hidden" name="query" id="primoQuery" />
                <fieldset className="Fieldset">
                    {/* <input type="text" className="Input" id="primoQueryTemp" defaultValue="Search Journal Finder..." onClick={clearField} /> */}
                    <TextField.Root>
                        <TextField.Slot>
                            <MagnifyingGlassIcon height="16" width="16" />
                        </TextField.Slot>
                        <TextField.Input size="3" id="primoQueryTemp" placeholder="Search Journal Finder..." onClick={clearField} />
                    </TextField.Root>
                </fieldset>
                <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
                    <button type="submit" className="Button green" onClick={searchPrimo}>Search</button>
                </div>
            </form>
        </Tabs.Content>
    </Tabs.Root>
  );
  
  export default Search;