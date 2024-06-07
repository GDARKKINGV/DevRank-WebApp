import Navbar from "@/components/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { getGlobalRankingRequest } from "@/api/ranking";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function Leaderboard() {
  const [ranking, setRanking] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { toast } = useToast();

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const res = await getGlobalRankingRequest(page, 9, searchTerm);

        setRanking(res.data.ranking);
        setTotalPages(Math.ceil(res.data.totalDevs / 9));
      } catch (error) {
        toast({
          variant: "destructive",
          description: error.message,
        });
      }
    };

    fetchRanking();
  }, [page, searchTerm]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={i === page}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pages;
  };

  return (
    <div>
      <Navbar />

      <div className="px-6 space-y-4">
        <div className="px-10 pb-4">
          <div className="flex items-center my-6">
            <form className="flex-1 max-w-xs">
              <Input
                placeholder="Search developers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ranking.length === 0
              ? Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index} className="relative">
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
              : ranking.map((user, index) => (
                  <Link key={index} to={`/dev-profile/${user.userId}`}>
                    <Card className="p-4 space-y-2 hover:bg-secondary">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12 border">
                          <AvatarImage src={user.profileImage} />
                          <AvatarFallback>{user.userName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-bold">
                            {user.name} {user.lastName}
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400">
                            @{user.userName}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="icon-[mdi--star]"></span>
                          <span className="font-medium">{user.points}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="icon-[mdi--trophy]"></span>
                          <span className="font-medium">{user.position}</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(page - 1)}
                />
              </PaginationItem>
              {renderPagination()}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(page + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
