'use client';
import React from 'react';
import { Card, Heading, Text, TextField} from '@radix-ui/themes'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import * as Tabs from '@radix-ui/react-tabs';
import * as Tooltip from '@radix-ui/react-tooltip';
import './css/search.css';
import { Oswald } from 'next/font/google'
import { ExternalLinkIcon } from '@radix-ui/react-icons'

const oswald = Oswald({
    weight: '400',
    subsets: ['latin'],
  })

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
        <Card className="shadow-xl p-1 md:p-2 rounded-t-lg">
            <Heading size="8" color="crimson" className={oswald.className}>Scholar OneSearch</Heading>
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
                Search Journals
                <Tooltip.Provider>
                    <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                            <a target='_blank' href="https://onesearch.library.northeastern.edu/discovery/jsearch?vid=01NEU_INST:NU_Olin"><ExternalLinkIcon className="ml-1 inline-block" /></a>
                        </Tooltip.Trigger>
                        <Tooltip.Content
                            className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
                            sideOffset={15}
                        >
                            Browse Journal Finder
                            <Tooltip.Arrow className="fill-white" />
                        </Tooltip.Content>
                    </Tooltip.Root>
                </Tooltip.Provider>
            </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="TabsContent" value="tab1">
            <form id="simple" name="searchForm" method="get" target="_blank" action="https://onesearch.library.northeastern.edu/discovery/search" encType="application/x-www-form-urlencoded; charset=utf-8">
                <input type="hidden" name="vid" value="01NEU_INST:NU_Olin" />
                <input type="hidden" name="tab" value="Everything" />
                <input type="hidden" name="search_scope" value="MillsCatalog" />
                <input type="hidden" name="query" id="primoQuery" />
                <fieldset className="Fieldset">
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
            <form id="simple" name="searchForm" method="get" target="_blank" action="https://onesearch.library.northeastern.edu/discovery/search" encType="application/x-www-form-urlencoded; charset=utf-8">
                <input type="hidden" name="vid" value="01NEU_INST:NU_Olin" />
                <input type="hidden" name="tab" value="Everything" />
                <input type="hidden" name="search_scope" value="Mills_and_CI" />
                <input type="hidden" name="query" id="primoQuery" />
                <fieldset className="Fieldset">
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
        <form id="simple" name="searchForm" method="get" target="_blank" action="https://onesearch.library.northeastern.edu/discovery/jsearch" encType="application/x-www-form-urlencoded; charset=utf-8">
                <input type="hidden" name="vid" value="01NEU_INST:NU_Olin" />
                <input type="hidden" name="tab" value="jsearch_slot" />
                <input type="hidden" name="search_scope" value="Mills_and_CI" />
                <input type="hidden" name="query" id="primoQuery" />
                <fieldset className="Fieldset">
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