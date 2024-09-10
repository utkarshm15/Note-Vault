import Link from "next/link";


export default function Home() {
  return <div className="bg-gradient-to-r from-slate-900 via-gray-700 to-slate-950 h-screen ">
    <div className="flex justify-between px-4 text-lg py-1">
      <div className="w-fit cursor-pointer text-slate-400 hover:text-white">NoteVault</div>
      <div className="flex gap-4">
        <div className="w-fit cursor-pointer text-slate-400 hover:text-white">Login</ div>
        <Link href={"/signup"}>
        <div className="w-fit cursor-pointer bg-green-300 rounded-full px-3 hover:text-white hover:bg-green-500 ">Sign Up</div>
        </Link>
      </div>
    </div>
    <div className="text-6xl font-semibold text-white text-center pt-40 ">Note Vault</div>
    <div className="text-xl font-md text-white text-center pt-2">Your place to study</div>
  </div>
}
