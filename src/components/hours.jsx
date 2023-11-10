import React from 'react';
import { FaRegClock } from "react-icons/fa";

const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)

async function getLibraryHours() {
  const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/c_b1631bcb3580a6cd93875bf2848dad1ea09747e99edcd4cc778301e7bb47a0ec@group.calendar.google.com/events?key=AIzaSyDGL-YEYrMZg_2pI-7jRsPvGwY5KSjuqVA' + '&maxResults=1' + '&timeMin=' + today.toISOString() + '&timeMax=' + tomorrow.toISOString() + '&orderBy=startTime' + '&singleEvents=True', {
        method: 'GET',
    });
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

async function getScHours() {
  const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/c_b1631bcb3580a6cd93875bf2848dad1ea09747e99edcd4cc778301e7bb47a0ec@group.calendar.google.com/events?key=AIzaSyDGL-YEYrMZg_2pI-7jRsPvGwY5KSjuqVA' + '&maxResults=1' + '&timeMin=' + today.toISOString() + '&timeMax=' + tomorrow.toISOString() + '&orderBy=startTime' + '&singleEvents=True', {
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
      <div className="justify-self-end mr-4">
			  <div className="grid grid-cols-1 gap-0">
          <div className='flex justify-end'>
            <div className='pr-5 align-middle'>
              <p className='pt-1'>
                <FaRegClock className="text-red-900 h-4 w-4 md:h-6 md:w-6" />
              </p>    
            </div>
            <div>
              <p className="text-sm md:text-lg font-semibold underline text-end">Today's Hours</p>
            </div>
          </div>
          <div className="col-span-2"><p className='md:text-sm text-xs text-end'>Library: {libraryData.items[0].summary}</p></div>
          <div className="col-span-2"><p className='md:text-sm text-xs text-end'>Special Collections: {scData.items[0].summary}</p></div>
        </div>
      </div>
    )
  }