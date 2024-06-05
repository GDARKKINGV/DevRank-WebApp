import Navbar from "@/components/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Leaderboard() {
  return (
    <div>
      <Navbar />

      <div className="px-6 space-y-4">
        <div className="px-10 pb-4">
          <div className="flex items-center my-6">
            <form className="flex-1 max-w-xs">
              <Input placeholder="Search developers..." />
            </form>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link>
              <Card className="p-4 space-y-2 hover:bg-secondary">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 border">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-bold">John Doe</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Software Engineer
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="icon-[mdi--star]"></span>
                    <span className="font-medium">4.8</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="icon-[mdi--trophy]"></span>
                    <span className="font-medium">1</span>
                  </div>
                </div>
              </Card>
            </Link>
            <Card className="p-4 space-y-2">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 border">
                  <AvatarImage src="https://github.com/shadcn.png" />

                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-bold">Jane Smith</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    UI/UX Designer
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="icon-[mdi--star]"></span>
                  <span className="font-medium">4.6</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="icon-[mdi--trophy]"></span>
                  <span className="font-medium">2</span>
                </div>
              </div>
            </Card>
            <Card className="p-4 space-y-2">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 border">
                  <AvatarImage src="https://github.com/shadcn.png" />

                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-bold">Michael Johnson</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Data Analyst
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="icon-[mdi--star]"></span>
                  <span className="font-medium">4.5</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="icon-[mdi--trophy]"></span>
                  <span className="font-medium">3</span>
                </div>
              </div>
            </Card>
            <Card className="p-4 space-y-2">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 border">
                  <AvatarImage src="https://github.com/shadcn.png" />

                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-bold">Emily Davis</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Product Manager
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="icon-[mdi--star]"></span>
                  <span className="font-medium">4.4</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="icon-[mdi--trophy]"></span>
                  <span className="font-medium">4</span>
                </div>
              </div>
            </Card>
            <Card className="p-4 space-y-2">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 border">
                  <AvatarImage src="https://github.com/shadcn.png" />

                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-bold">David Lee</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Backend Engineer
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="icon-[mdi--star]"></span>
                  <span className="font-medium">4.3</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="icon-[mdi--trophy]"></span>
                  <span className="font-medium">5</span>
                </div>
              </div>
            </Card>
            <Card className="p-4 space-y-2">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 border">
                  <AvatarImage src="https://github.com/shadcn.png" />

                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-bold">Sarah Chen</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Front-end Developer
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="icon-[mdi--star]"></span>
                  <span className="font-medium">4.2</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="icon-[mdi--trophy]"></span>
                  <span className="font-medium">6</span>
                </div>
              </div>
            </Card>
            <Link>
              <Card className="p-4 space-y-2 hover:bg-secondary">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 border">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-bold">John Doe</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Software Engineer
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="icon-[mdi--star]"></span>
                    <span className="font-medium">4.8</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="icon-[mdi--trophy]"></span>
                    <span className="font-medium">7</span>
                  </div>
                </div>
              </Card>
            </Link>
            <Link>
              <Card className="p-4 space-y-2 hover:bg-secondary">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 border">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-bold">John Doe</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Software Engineer
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="icon-[mdi--star]"></span>
                    <span className="font-medium">4.8</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="icon-[mdi--trophy]"></span>
                    <span className="font-medium">8</span>
                  </div>
                </div>
              </Card>
            </Link>
            <Link>
              <Card className="p-4 space-y-2 hover:bg-secondary">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 border">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-bold">John Doe</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Software Engineer
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="icon-[mdi--star]"></span>
                    <span className="font-medium">4.8</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="icon-[mdi--trophy]"></span>
                    <span className="font-medium">9</span>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
