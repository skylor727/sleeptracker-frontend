import { type NextPage } from "next";
import Link from 'next/link'


const Home: NextPage = () => {
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src="/bed.svg" className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">Sleep Tracker</h1>
            <p className="py-6">Enter the time you have to go to sleep or have to wake up
              and get recommended the time to awake or sleep while also keeping a log of your sleep!</p>
            <Link href="/sleep">
              <button className="btn btn-primary">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;



