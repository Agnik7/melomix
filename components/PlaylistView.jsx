import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { shuffle } from 'lodash';
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Song from './Song';

const colors = [
    'from-indigo-500',
    'from-blue-500',
    'from-violet-500',
    'from-purple-500'
]

const PlaylistView = ({ globalPlaylistId, setGlobalCurrentSongId, setGlobalIsTrackPlaying, setView, setGlobalArtistId }) => {
    const { data: session } = useSession()
    const [playlistData, setPlaylistData] = useState(null)
    const [color, setColor] = useState(colors[0])
    const [opacity, setOpacity] = useState(0)
    const [textOpacity, setTextOpacity] = useState(0)

    function changeOpacity(scrollPos) {
        // scrollPos = 0 -> opacity = 0 
        // scrollPos = 300 -> opacity = 1, textOpacity = 0
        // scrollPos = 310 -> opacity = 1, textOpacity = 1
        const offset = 300
        const textOffset = 10
        if (scrollPos < offset) {
            const newOpacity = 1 - ((offset - scrollPos) / offset)
            setOpacity(newOpacity)
            setTextOpacity(0)
        } else {
            setOpacity(1)
            const delta = scrollPos - offset
            const newTextOpacity = 1 - ((textOffset - delta) / textOffset)
            setTextOpacity(newTextOpacity)
        }
    }

    useEffect(() => {
        async function f() {
            if (session && session.accessToken) {
                console.log(session)
                const response = await fetch(`https://api.spotify.com/v1/playlists/${globalPlaylistId}`, {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`
                    }
                })
                const data = await response.json()
                setPlaylistData(data)
            }
        }
        f()
    }, [session, globalPlaylistId])

    useEffect(() => {
        setColor(shuffle(colors).pop())
    }, [globalPlaylistId])

    return (
        <div className='flex-grow h-screen'>
            <header style={{ opacity: opacity }} className='text-white sticky py-[2rem] px-8 top-0 md:h-20 z-10 text-2xl xs:text-4xl bg-[#17153a] xs:p-8 flex flex-col gap-[2rem] justify-between md:flex-row items-center font-bold'>
                <div className='md:hidden  w-full flex flex-col gap-[1rem] xxxs:flex-row justify-between'>
                    <h1 className='text-[1.5rem] xxs:text-[2rem] text-white font-bold'>MeloMix</h1>
                    <ul className='text-[1rem] flex gap-[0.5rem]'>
                        <li className='cursor-pointer' onClick={()=>setView("home")}>Home</li>
                        <li className='cursor-pointer' onClick={()=>setView("search")}>Search</li>
                        <li className='cursor-pointer' onClick={()=>setView("library")}>Library</li>
                    </ul>
                </div>
                <div className='w-full flex flex-col gap-[2rem] xs:flex-row justify-between'>
                    <div style={{ opacity: textOpacity }} className='flex items-center'>
                        {playlistData && <img className='h-8 w-8 mr-6' src={playlistData.images[0].url} />}
                        <p>{playlistData?.name}</p>
                    </div>
                    <div onClick={() => signOut()} className='md:absolute z-20 md:top-5 md:right-8 flex items-center bg-[blue] bg-opacity-70 text-white space-x-3 opacity-90 hover:bg-blue-600 cursor-pointer rounded-full p-1 px-[2rem]'>
                        
                        <p className='w-full text-center text-[1.5rem]'>Logout</p>
                        {/* <ChevronDownIcon className='h-5 w-5' /> */}
                    </div>
                </div>
            </header>
            <div onScroll={(e) => changeOpacity(e.target.scrollTop)} className='relative -top-20 h-screen overflow-y-scroll bg-neutral-900'>
                <section className={`flex items-end space-x-7 bg-gradient-to-b to-slate-900 ${color} h-80 text-white p-8`}>
                    {playlistData && <img className='h-44 w-44' src={playlistData.images[0].url} />}
                    <div>
                        <p className='text-sm font-bold'>Playlist</p>
                        <h1 className='text-2xl md:text-3xl lg:text-5xl font-extrabold'>{playlistData?.name}</h1>
                    </div>
                </section>
                <div className='text-white px-8 flex flex-col bg-gradient-to-b from-slate-900 via-blue-600 to-slate-900 space-y-1 pb-28'>
                    {playlistData?.tracks.items.map((track, i) => {
                        // song component
                        return <Song
                            setView={setView}
                            setGlobalArtistId={setGlobalArtistId}
                            setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
                            setGlobalCurrentSongId={setGlobalCurrentSongId}
                            key={track.track.id}
                            sno={i}
                            track={track.track}
                        />
                    })}
                </div>
            </div>
        </div>
    );
}

export default PlaylistView;
