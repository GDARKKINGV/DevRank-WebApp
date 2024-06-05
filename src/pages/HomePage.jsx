import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <section className="py-20 md:py-28 px-8 md:px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">
              Find Your Next Developer Role
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              DevRank is the premier job search platform for developers,
              combining traditional job listings with a unique system for
              assessing your coding skills.
            </p>
            <div className="flex gap-4">
              <Button>
                <Link to="/offers">Find Jobs</Link>
              </Button>
              <Button variant="outline">
                <Link to="/challenges">Solve Challenges</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28 px-8 md:px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="space-y-4 text-center">
            <span className="icon-[mdi--briefcase]"></span>

            <h3 className="text-2xl font-bold">Thousands of Jobs</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Browse through a vast selection of developer jobs from top
              companies.
            </p>
          </div>
          <div className="space-y-4 text-center">
            <span className="icon-[mdi--code]"></span>

            <h3 className="text-2xl font-bold">Coding Challenges</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Showcase your skills by solving challenging programming problems.
            </p>
          </div>
          <div className="space-y-4 text-center">
            <span className="icon-[mdi--trophy]"></span>

            <h3 className="text-2xl font-bold">Rank and Reputation</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Build your reputation and get noticed by top companies.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28 px-8 md:px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">
              Prove Your Skills with Challenges
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              DevRank offers a unique system of coding challenges that allow you
              to showcase your skills and get noticed by top companies.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="icon-[mdi--check]"></span>
                <span>Solve challenging programming problems</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="icon-[mdi--check]"></span>
                <span>Earn points and build your reputation</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="icon-[mdi--check]"></span>
                <span>Get noticed by top companies</span>
              </li>
            </ul>
            <Button>
              <Link to="/challenges">Start Solving Challenges</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
