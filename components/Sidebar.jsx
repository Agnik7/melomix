import { BuildingLibraryIcon, HeartIcon, HomeIcon, MagnifyingGlassIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const SpotifySVG = () => (
    <svg viewBox="0 0 1134 340" className="text-white h-10 max-w-[131px]"><title>MeloMix</title></svg>
)

const Sidebar = ({ view, setView, setGlobalPlaylistId }) => {
    const { data: session } = useSession()
    const [playlists, setPlaylists] = useState([])
    // console.log(session.user.accessToken)
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
        <div className='w-64 text-neutral-400 bg-gradient-to-br from-purple-800 via-purple-800 to-black grow-0 shrink-0 h-screen overflow-y-scroll border-r border-neutral-900 p-5 text-sm hidden md:inline-flex'>
            <div className='space-y-4'>
                <div className='mt-1 mb-[2rem] cursor-pointer' onClick={()=>setView("home")}>
                    <h1 className='text-white text-[2rem] font-bold text-center'>MeloMix</h1>
                </div>

                <button className={`flex items-center text-[1.2rem] space-x-2 hover:text-white ${view == "home" ? "text-white" : null}`} onClick={()=>setView("home")}>
                    <HomeIcon className='h-[1.5rem] w-[1.5rem]' />
                    <p>Home</p>
                </button>
                <button onClick={() => setView("search")} className={`flex items-center text-[1.2rem] space-x-2 hover:text-white ${view == "search" ? "text-white" : null}`}>
                    <MagnifyingGlassIcon className='h-[1.5rem] w-[1.5rem]' />
                    <p>Search</p>
                </button>
                <button onClick={() => setView("library")} className={`flex items-center space-x-2 text-[1.2rem] hover:text-white ${view == "library" ? "text-white" : null}`}>
                    <BuildingLibraryIcon className='h-[1.5rem] w-[1.5rem]' />
                    <p>Your Library</p>
                </button>
                <hr className='border-white' />
                <button className='flex items-center space-x-2 text-[1.2rem] hover:text-white'>
                    <PlusCircleIcon className='h-[1.5rem] w-[1.5rem]' />
                    <p>Create Playlist</p>
                </button>
                <button className='flex items-center space-x-2 text-[1.2rem] hover:text-white'>
                    <HeartIcon className='h-[1.5rem] w-[1.5rem]' />
                    <p>Liked Songs</p>
                </button>
                <hr className='border-white' />
                {
                    playlists && playlists.map((playlist) => {
                        return (
                            <p
                                onClick={() => {
                                    setView("playlist")
                                    setGlobalPlaylistId(playlist.id)
                                }}
                                key={playlist.id}
                                className='cursor-default text-[1.2rem] hover:text-white hover:cursor-pointer'
                            >
                                {playlist.name}
                            </p>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Sidebar;
