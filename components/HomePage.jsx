import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import FeaturedPlaylists from './FeaturedPlaylists';
import SearchResults from './SearchResults';

const HomePage = ({ setView, setGlobalPlaylistId, setGlobalCurrentSongId, setGlobalIsTrackPlaying, setGlobalArtistId }) => {
    const { data: session } = useSession()
    const [searchData, setSearchData] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef(null)
    async function updateSearchResults(query) {
        const response = await fetch("https://api.spotify.com/v1/search?" + new URLSearchParams({
            q: query,
            type: ["artist", "playlist", "track"]
        }), {
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            }
        })
        const data = await response.json()
        setSearchData(data)
    }

    useEffect(() => {
        inputRef.current.focus()
    }, [inputRef])

    return (
        <div className='flex-grow h-screen'>
            <header className='text-white sticky bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 shadow-lg py-[1rem] md:py-0 top-0 md:h-20 z-10 text-4xl flex flex-col gap-[2rem] md:flex-row justify-between items-center px-8'>
                <div className='md:hidden  w-full flex flex-col gap-[1rem] xxxs:flex-row justify-between'>
                    <h1 className='text-[1.5rem] xxs:text-[2rem] text-white font-bold'>MeloMix</h1>
                    <ul className='text-[1rem] flex gap-[0.5rem]'>
                        <li className='cursor-pointer' onClick={()=>setView("home")}>Home</li>
                        <li className='cursor-pointer' onClick={()=>setView("search")}>Search</li>
                        <li className='cursor-pointer' onClick={()=>setView("library")}>Library</li>
                    </ul>
                </div>
                <div className='w-full flex gap-[2rem] flex-col xs:flex-row justify-between'>
                    <div className='flex gap-2 bg-white rounded-full w-full outline-0 py-2 xs:w-1/2 xmd:w-96 px-[0.5rem]'>
                        <MagnifyingGlassIcon className='h-6 w-6 text-neutral-800' />
                        <input value={inputValue} onChange={async (e) => {

                            setInputValue(e.target.value)
                            if(inputValue.length === 0)
                                setSearchData(null)
                            else
                                await updateSearchResults(e.target.value)
                        }} ref={inputRef} className=' bg-white  text-neutral-900 text-base  font-normal outline-0' />                    
                    </div>
                
                    <div onClick={() => signOut()} className='md:absolute z-20 md:top-5 md:right-8 flex items-center bg-[blue] bg-opacity-70 text-white space-x-3 opacity-90 hover:bg-blue-600 cursor-pointer rounded-full p-1 px-[2rem]'>
                        
                        <p className='text-center w-full text-[1.2rem] xmd:text-[1.5rem]'>Logout</p>
                        {/* <ChevronDownIcon className='h-5 w-5' /> */}
                    </div>

                </div>
            </header>
            <div>
                {(searchData === null || inputValue.length === 0) ? <FeaturedPlaylists
                    setView={setView}
                    setGlobalPlaylistId={setGlobalPlaylistId}
                /> : <SearchResults
                    playlists={searchData?.playlists.items}
                    songs={searchData?.tracks.items}
                    artists={searchData?.artists.items}
                    setView={setView}
                    setGlobalPlaylistId={setGlobalPlaylistId}
                    setGlobalCurrentSongId={setGlobalCurrentSongId}
                    setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
                    setGlobalArtistId={setGlobalArtistId}
                />}
            </div>
        </div>
    );
}

export default HomePage;
