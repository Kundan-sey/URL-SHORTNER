import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import React, { useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
const LandingPage = () => {
  const navigate= useNavigate()
  const [longUrl,setLongUrl] = useState("")
  const handleShorten  = (e)=>{
    e.preventDefault()
    if(longUrl){
      navigate(`/auth/?createNew=${longUrl}`)
    }
  }
  return (
    <div className='flex flex-col items-center'>
      <h2 className='my-10 leading-tight sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold'>The only URL Shortner <br/>{"you'll"} ever need! 👇</h2>
      <form onSubmit={handleShorten} className='sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2' >
      <Input 
  type="url" 
  value={longUrl}
  onChange={(e) => {
    const { value } = e.target;
    setLongUrl(value); // Assuming setLongUrl is a setState function from useState hook
    // console.log(longUrl); // Ensure this logs the updated state after it has been set
  }} 
  placeholder="Enter your long URL.." 
  className="h-full flex-1 p-4"
/>
        <Button className="h-full" type="submit" variant="destructive">Shorten!</Button>
      </form>
       
        <img src="/cortalyBanner1.jpeg" className='w-full  my-11 md:px-11' alt="poster-image" />
        <Accordion type="multiple" collapsible="true" className="w-full md:px-11">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            How does the Cortaly URL shortener works?
          </AccordionTrigger>
          <AccordionContent>
            When you enter a long URL, our system generates a shorter version of
            that URL. This shortened URL redirects to the original long URL when
            accessed.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Do I need an account to use the app?
          </AccordionTrigger>
          <AccordionContent>
            Yes. Creating an account allows you to manage your URLs, view
            analytics, and customize your short URLs.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            What analytics are available for my shortened URLs?
          </AccordionTrigger>
          <AccordionContent>
            You can view the number of clicks, geolocation data of the clicks
            and device types (mobile/desktop) for each of your shortened URLs.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default LandingPage
