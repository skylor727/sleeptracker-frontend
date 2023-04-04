import { type NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src="/bed.svg" className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">Sleep Tracker</h1>
            <p className="py-6">
              Discover the optimal time to sleep or wake up by entering your
              desired bedtime or wake-up time. Our sleep calculator provides
              personalized recommendations to help you feel refreshed and
              rejuvenated. Plus, effortlessly keep track of your sleep patterns
              with our handy sleep log feature. Experience better sleep, one
              night at a time.
            </p>
            <Link href="/sleep">
              <button className="btn-primary btn">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
