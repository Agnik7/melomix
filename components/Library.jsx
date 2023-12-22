import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { PlayIcon } from '@heroicons/react/24/solid';
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const Library = ({ setView, setGlobalPlaylistId }) => {
    const { data: session } = useSession()
    const [playlists, setPlaylists] = useState([])

    function selectPlaylist(playlist) {
        setView("playlist")
        setGlobalPlaylistId(playlist.id)
    }

    useEffect(() => {
        async function f() {
            if (session && session.accessToken) {
                const response = await fetch("https://api.spotify.com/v1/me/playlists", {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`
                    }
                })
                const data = await response.json()
                setPlaylists(data.items)
            }
        }
        f()
    }, [session])
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
                <div className='w-full flex gap-[2rem] flex-col xs:flex-row justify-end'>
                    <div onClick={() => signOut()} className='md:absolute z-20 md:top-5 md:right-8 flex items-center bg-[blue] bg-opacity-70 text-white space-x-3 opacity-90 hover:bg-blue-600 cursor-pointer rounded-full p-1 px-[2rem]'>
                        {/* <img className='rounded-full w-7 h-7' src={session?.user.image} alt="profile pic" /> */}
                        <p className='text-center w-full text-[1.2rem] xmd:text-[1.5rem]'>Logout</p>
                        {/* <ChevronDownIcon className='h-5 w-5' /> */}
                    </div>
                </div>
            </header>
            <div className='flex flex-col gap-4 px-8 h-screen overflow-y-scroll'>
                <h2 className='text-[2rem] text-purple-100 font-bold'>Playlists</h2>
                <div className='flex flex-wrap gap-6 mb-48'>
                    {playlists && playlists.map((playlist) => {
                        return <div onClick={() => selectPlaylist(playlist)} key={playlist.id} className='cursor-pointer relative group w-56 mb-2 bg-[#17153a] hover:bg-[#343083] rounded-[2rem] p-4'>
                            <div className='absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-[#5d56e4] top-[156px] group-hover:top-[148px] right-6'>
                                <PlayIcon className='h-6 w-6 text-white' />
                            </div>
                            <img className='w-48 h-48 mb-4 rounded-[1rem] object-cover' src={playlist.images[0].url} />
                            <p className='text-base text-white mb-1 w-48 truncate'>{playlist.name}</p>
                            <p className='text-sm text-neutral-400 mb-8 w-48 truncate'>By {playlist.owner.display_name}</p>
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
}

export default Library;
