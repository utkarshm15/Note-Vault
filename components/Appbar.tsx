export function Appbar(){
    return <div className="flex justify-between px-2 py-2 shadow-md  fixed top-0 left-0 right-0 border-b border-black">
        <h1 className="drop-shadow-lg text-slate-300">
            NoteVault
        </h1>
        <div className="flex gap-6 px-3 py-0.5">
            <div className="hover:underline cursor-pointer">My Notes</div>
            <div className="w-fit rounded-full ring-1 ring-black hover:bg-red-600 cursor-pointer hover:text-white px-3 py-0.5">
                Logout
            </div>
            <div >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 hover:text-gray-200 hover:fill-black    cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </div>
        </div>
    </div>
}