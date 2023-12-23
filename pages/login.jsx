import { signIn } from "next-auth/react"

const Login = () => {
    return (
        <div className='w-full bg-[#050510] h-screen flex items-center justify-center'>
            <div className="glow bg-gradient-to-r from-[#e44141] to-[#4f2af3] h-[150px] w-4/5 mx-auto rounded-full absolute left-0 right-0 top-0 transform -translate-y-1/2 blur-[160px]"></div>
            <div className="w-full px-[2rem] sm:px-0 sm:w-3/5">
                <h1 className="text-[transparent] w-full text-center text-[3rem] xs:text-[4rem] sm:text-[5rem] font-bold"><span className="bg-gradient-to-r from-[#e44141] to-[#4f2af3] bg-clip-text text-[transparent]">MeloMix</span></h1>
                <h2 className="w-full text-center text-white text-[1.5rem] font-semibold">Where Every Beat Finds Its Perfect Blend!</h2>
                <p className="text-white w-full my-[2rem] text-[1.5rem] sm:text-[2rem] opacity-70 text-center">Elevate your music journey with a symphony of innovation. Explore seamlessly curated melodies across genres, effortlessly rediscover favorites, and experience a harmonious blend that resonates with your unique taste. Embrace the future of sound – MeloMix, where every beat finds its perfect blend.</p>
                <div className="flex justify-center items-center w-full my-[2rem]">
                    <button className="text-white px-8 py-2 rounded-full bg-[blue] bg-opacity-70 hover:bg-blue-600 cursor-pointer font-bold text-lg" onClick={() => signIn('spotify', { callbackUrl: "/" })}>
                        <p className="text-center w-full text-[1.2rem] xmd:text-[1.5rem]">Login with Spotify</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
