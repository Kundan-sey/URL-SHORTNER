import CreateLink from '@/components/createLink'
import Error from '@/components/error'
import LinkCard from '@/components/linkCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { UrlState } from '@/context'
import { getClicksForUrls, getClicksForUrlsDash } from '@/db/apiClicks'
import { getUrls } from '@/db/apiUrls'
import useFetch from '@/hooks/useFetch'
import { Filter } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners'

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const { user } = UrlState()
  const { loading: loadingUrls, error: errorUrls, data: urls, fn: fnUrls } = useFetch(getUrls, user?.id)
  const { loading: loadingClicks, error: errorClicks, data: clicks, fn: fnClicks } = useFetch(getClicksForUrlsDash, urls?.map((url) => url.id))

  useEffect(() => {
    fnUrls(); // Fetch URLs when component mounts or when user changes
  }, [user?.id]); // Dependency on user.id ensures it refetches when user changes

  useEffect(() => {
    if (urls?.length) {
      fnClicks(); // Fetch clicks when urls are loaded or when urls change
    }
  }, [urls]); // Dependency on urls ensures it refetches when urls change

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='flex flex-col gap-8'>
      {(loadingUrls || loadingClicks) && (<BarLoader width={"100%"} color='#36d7b7' />)}
      <div className='grid grid-cols-2 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls ? urls.length : 0}</p> {/* Display length of urls */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks ? clicks.length : 0}</p> {/* Display length of clicks */}
          </CardContent>
        </Card>
      </div>
      <div className='flex justify-between'>
        <h1 className='text-4xl font-extrabold'>
          My Links
        </h1>
        <CreateLink/>
      </div>
      <div className="relative">
        <Input
          type="text"
          value={searchQuery}
          placeholder="Filter Links"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <Filter className='absolute top-2 right-2 p-1' />
      </div>
          {/* {error && <Error message={error.message}/>} */}
          {(filteredUrls || []).map((url, i) => (
        <LinkCard key={i} url={url} fetchUrls={fnUrls} />
      ))}
    </div>

  )
}

export default Dashboard
