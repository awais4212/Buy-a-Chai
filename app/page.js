import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className=" flex flex-col justify-center h-[44vh] items-center">
        <Link href={'/'}>
        <div className="font-bold flex text-5xl justify-center items-center">Buy me a Chai <span><img src="/tea.gif" alt="tea gif" width={88} /></span></div>
        </Link>
        <p>
          A Crowd Funding platform for your Favorite Creators. Get funded by your fans and followers. Start now!
        </p>
        <div className="flex gap-4 p-4">
          <button className="relative inline-flex items-center justify-center px-6 py-3 font-semibold text-white transition-all duration-300 bg-linear-to-r from-purple-600 to-blue-500 rounded-xl shadow-lg hover:shadow-purple-500/40 hover:scale-105 active:scale-95">
            Start Now
          </button>
          <button className="relative inline-flex items-center justify-center px-6 py-3 font-semibold text-white transition-all duration-300 bg-linear-to-r from-purple-600 to-blue-500 rounded-xl shadow-lg hover:shadow-purple-500/40 hover:scale-105 active:scale-95">
            Read More
          </button>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto pb-32 pt-14">
        <h2 className="text-3xl font-bold text-center mb-14">Your Fans Can Buy You A Chai</h2>

        <div className="flex gap-5 justify-between py-32">
          <div className="item space-y-3 flex flex-col items-center justify-center"><img className="bg-purple-900 rounded-full p-2" src="/man.gif" width={88} alt="man" />
            <p className="font-bold">Fund Yourself</p>
            <p className=" text-center">Your Fans are Available to help</p>
          </div>

          <div className="item space-y-3 flex flex-col items-center justify-center"><img className="bg-purple-900 rounded-full p-2" src="/coin.gif" width={88} alt="man" />
            <p className="font-bold">Fund Yourself</p>
            <p className=" text-center">Your Fans are Available to help</p>
          </div>

          <div className="item space-y-3 flex flex-col items-center justify-center"><img className="bg-purple-900 rounded-full p-2" src="/group.gif" width={88} alt="man" />
            <p className="font-bold">Fan wants to help</p>
            <p className=" text-center">Your Fans are Available to help</p>
          </div>
        </div>

        <div className="bg-white h-1 opacity-10"></div>

        <h2 className="text-3xl font-bold text-center mb-10 mt-10">Learn More About Us</h2>

        <div className="flex justify-center items-center py-32">
          <div className="w-full max-w-3xl aspect-video">
            <iframe
              className="w-full h-full rounded-xl"
              src="https://www.youtube.com/embed/9K2NTS8rlrk"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

      </div>
    </>
  );
}
