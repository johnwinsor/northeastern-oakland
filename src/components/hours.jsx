import React from 'react';
import { Badge, Card, Container, Flex, Heading, Text} from '@radix-ui/themes'
import '@radix-ui/themes/styles.css';
import { FaRegClock } from "react-icons/fa";

const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)

async function getLibraryHours() {
  const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/c_b1631bcb3580a6cd93875bf2848dad1ea09747e99edcd4cc778301e7bb47a0ec@group.calendar.google.com/events?key=${process.env.GOOGLE_KEY}&maxResults=1&timeMin=${today.toISOString()}&timeMax=${tomorrow.toISOString()}&orderBy=startTime&singleEvents=True`, {
        method: 'GET',
    });
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

async function getScHours() {
  const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/c_6aa7be8d89dd7ebf573e717768faa890164256d38c823f7f5c5112dd0312cb8b@group.calendar.google.com/events?key=${process.env.GOOGLE_KEY}&maxResults=1&timeMin=${today.toISOString()}&timeMax=${tomorrow.toISOString()}&orderBy=startTime&singleEvents=True`, {
        method: 'GET',
    });
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}


export async function Hours() {
    const libraryData = await getLibraryHours()
    const scData = await getScHours()

    return (
        <Flex direction="column" align="end">
            <Flex direction="column">
                <Flex justify="end" gap="2">
                    <FaRegClock className="text-red-900 h-4 w-4 lg:h-5 lg:w-5 float-left pt-1" />
                    <Text 
                        weight="bold"
                        size={{
                        initial: '1',
                        sm: '2',
                        md: '3',
                        }}>Today&apos;s Hours
                    </Text>
                </Flex>
                <Flex justify="end" gap="2">
                    <Text
                        size={{
                        initial: '1',
                        md: '1',
                        }}>F.W. Olin: {libraryData.items[0].summary}
                    </Text>
                </Flex>
                <Flex justify="end" gap="2">
                    <Text
                        size={{
                        initial: '1',
                        md: '1',
                        }}>Heller Room: {scData.items[0].summary}
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    )
  }