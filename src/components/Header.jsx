import { Link2Icon, LinkIcon, LogOut, Nfc } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import { Avatar } from './ui/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { UrlState } from '@/context'
import { logout } from '@/db/apiAuth'
import useFetch from '@/hooks/useFetch'
import { BarLoader } from 'react-spinners'
const Header = () => {
    const navigate = useNavigate()
  const{user,fetchUser}=UrlState()
  const {loading,fn:fnLogout}=useFetch(logout)
  return (
    <>
   <nav className='p-4 flex justify-between items-center'>
    <Link to="/">
    
    <img className='h-14 select-none  object-cover' src="https://i.ibb.co/g9F1Qt7/logopic.png" loading='lazy' alt="Logo" />
    </Link>
    <div> 
        {!user ?  <Button onClick={()=>{
            navigate("/auth")
        }} >Login</Button> :(
            <DropdownMenu >
  <DropdownMenuTrigger className='w-10 rounded-full overflow-hidden'>
    <Avatar>
  <AvatarImage className='object-contain' src={user.user_metadata?.profile_pic} />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
</DropdownMenuTrigger>
  <DropdownMenuContent className="cursor-pointer">
    <DropdownMenuLabel>{user.user_metadata?.name}</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={() => navigate('/dashboard')} className='flex'>
    <LinkIcon className='mr-2 h-4 w-4'/>    My Links
          </DropdownMenuItem>
    <DropdownMenuItem className="text-red-500">
        <LogOut className='mr-2 h-4 w-4'/><span onClick={()=>{
          fnLogout().then(()=>{
            fetchUser()
              navigate("/")
          })
        }}>Logout</span></DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

        ) }
       
    </div>
   </nav>
    {loading && <BarLoader className='mb-4' width={"100%"} color='#36d7b7'/>}
    </>
  )
}

export default Header
