import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import DeviceStats from '@/components/ui/deviceStats'
import LocationStats from '@/components/ui/locationStats'
import UrlProvider, { UrlState } from '@/context'
import { getClicksForUrls } from '@/db/apiClicks'
import { deleteUrls, getUrl } from '@/db/apiUrls'
import useFetch from '@/hooks/useFetch'
import { Copy, Download, DownloadIcon, LinkIcon, Trash } from 'lucide-react'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BarLoader, BeatLoader } from 'react-spinners'

const Link = () => {
  const hostUrl = "https://url-shortner-kundan.netlify.app/"; 
  // const hostUrl = "http://192.168.0.100:5173/"; 
  const {user} = UrlState()
  const {id} = useParams()
  const { loading, data: url, fn, error:err } = useFetch(getUrl, { id, user_id: user?.id });
  const { loading: loadingStats, data: stats, fn: fnStats, error: errorStats } = useFetch(getClicksForUrls, id);
  const {loading: loadingDelete, fn: fnDelete} = useFetch(deleteUrls, id);
  const navigate = useNavigate()
  useEffect(()=>{
    fn()
    fnStats()
  },[])
  if(err){
    navigate("/dashboard")
  }
  const downloadImage =()=>{
    const imageUrl = url?.qr
    const fileName = url?.title
    const anchor = document.createElement('a')
    anchor.href=imageUrl
    anchor.download=fileName
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
}
  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url;
  }
  return (
    <>
    {(loading || loadingStats) && (
      <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
    )}
    {/* {console.log(id)} */}
    <div className="flex flex-col  gap-8 sm:flex-row justify-between">
      <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
        <span className="text-6xl font-extrabold hover:underline cursor-pointer">{url?.title}</span>
        <a
            href={`${hostUrl}${link}`}
            target="_blank"
            className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer"
          >
           {`${hostUrl}${link}`} 
          </a>
          <a
            href={`${url?.original_url}`}
            target="_blank"
            className="flex items-center gap-1 hover:underline cursor-pointer"
          >
            <LinkIcon className="p-1" />
            {url?.original_url}
          </a>
          <span className="flex items-end font-extralight text-sm">
            {new Date(url?.created_at).toLocaleString()}
          </span>
        </div>
      <div className='flex  gap-2'>
      <Button
              variant="ghost"
              onClick={() =>
                navigator.clipboard.writeText(`${hostUrl}${link}`)
              }
            >
              <Copy />
            </Button>
            <Button variant="ghost" onClick={downloadImage}>
              <DownloadIcon />
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                fnDelete().then(() => {
                  navigate("/dashboard");
                })
              }
              disable={loadingDelete}
            >
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash />
              )}
            </Button>
            <img
            src={url?.qr}
            className="w-2/4 self-center sm:self-start ring ring-blue-500 p-1 object-contain"
            alt="qr code"
          />
      </div>
      <Card className="sm:w-3/5">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold">Stats</CardTitle>
          </CardHeader>
          {stats && stats.length ? (
            <CardContent className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{stats?.length}</p>
                </CardContent>
              </Card>

              <CardTitle>Location Data</CardTitle>
              <LocationStats stats={stats} />
              <CardTitle>Device Info</CardTitle>
              <DeviceStats stats={stats} />
            </CardContent>
          ) : (
            <CardContent>
              {loadingStats === false
                ? "No Statistics yet"
                : "Loading Statistics.."}
            </CardContent>
          )}
        </Card>
    </div>
    </>
  )
}

export default Link
