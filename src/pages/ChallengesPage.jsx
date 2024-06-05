import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getChallengesRequest } from "@/api/challenges";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState([]);

  const getChallenges = async () => {
    try {
      const res = await getChallengesRequest();
      setChallenges(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getChallenges();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container space-y-12 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter ">
              Showcase Your Skills
            </h2>
            <p className="max-w-[900px] text-gray-500 dark:text-gray-400">
              Solve programming challenges and earn points to climb the
              leaderboard. Impress potential employers with your problem-solving
              skills.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.length === 0
            ? Array.from({ length: 6 }).map((_, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-col md:flex-row items-start md:items-center gap-4 p-6">
                    <div className="flex items-center gap-4">
                      <div className="grid gap-1">
                        <Skeleton className="h-10 w-20" />
                        <Skeleton className="h-6 w-40" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-10 w-24" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 grid gap-4">
                    <Skeleton className="h-6 w-14" />
                  </CardContent>
                </Card>
              ))
            : challenges.map((challenge) => (
                <Card key={challenge._id}>
                  <CardHeader className="flex flex-col md:flex-row items-start md:items-center gap-4 p-6">
                    <div className="flex items-center gap-4">
                      <div className="grid gap-1">
                        <CardTitle>{challenge.title}</CardTitle>
                        <CardDescription>
                          {challenge.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                      <Badge
                        variant="outline"
                        className={`border-${challenge.color}-600 bg-white dark:bg-gray-950`}
                      >
                        {challenge.difficulty}
                      </Badge>
                      <Button
                        variant="outline"
                        className="px-4 py-2 rounded-lg"
                      >
                        <Link to={`/challenges-dev/${challenge._id}`}>
                          Start
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 grid gap-4">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="icon-[mdi--trophy]"></span>
                        {challenge.points} points
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    </div>
  );
}
