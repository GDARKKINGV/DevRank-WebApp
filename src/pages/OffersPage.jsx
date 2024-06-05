import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

export default function OffersPage() {
  return (
    <div>
      <Navbar />
      <div className="px-6">
        <div className="px-10 pb-4">
          <div className="flex items-center gap-6 my-6">
            <form className="flex-1 max-w-xs">
              <Input placeholder="Search Offers..." />
            </form>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
                >
                  <span className="icon[mdi--filter]"></span>
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[300px] p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select id="location" defaultValue="all">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All locations</SelectItem>
                      <SelectItem value="new-york">New York</SelectItem>
                      <SelectItem value="san-francisco">
                        San Francisco
                      </SelectItem>
                      <SelectItem value="london">London</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience</Label>
                  <Select id="experience" defaultValue="all">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All experience levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All experience levels</SelectItem>
                      <SelectItem value="entry-level">Entry-level</SelectItem>
                      <SelectItem value="mid-level">Mid-level</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Apply Filters</Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Software Engineer</CardTitle>
                <CardDescription>Acme Inc.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="icon-[ion--locate]"></span>
                  <p className="text-gray-500 dark:text-gray-400">
                    New York, NY
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="icon-[mdi--briefcase]"></span>

                  <p className="text-gray-500 dark:text-gray-400">Mid-level</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="icon-[mdi--tag]"></span>
                  <p className="text-gray-500 dark:text-gray-400">
                    JavaScript, React, Node.js
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="mr-2">
                  View Job
                </Button>
                <Button>Apply</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Frontend Developer</CardTitle>
                <CardDescription>Acme Inc.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="icon-[ion--locate]"></span>
                  <p className="text-gray-500 dark:text-gray-400">
                    San Francisco, CA
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="icon-[mdi--briefcase]"></span>

                  <p className="text-gray-500 dark:text-gray-400">Senior</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="icon-[mdi--tag]"></span>
                  <p className="text-gray-500 dark:text-gray-400">
                    React, Redux, TypeScript
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="mr-2">
                  View Job
                </Button>
                <Button>Apply</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Backend Developer</CardTitle>
                <CardDescription>Acme Inc.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="icon-[ion--locate]"></span>
                  <p className="text-gray-500 dark:text-gray-400">Remote</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="icon-[mdi--briefcase]"></span>

                  <p className="text-gray-500 dark:text-gray-400">
                    Entry-level
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="icon-[mdi--tag]"></span>
                  <p className="text-gray-500 dark:text-gray-400">
                    Node.js, Express, MongoDB
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="mr-2">
                  View Job
                </Button>
                <Button>Apply</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Data Analyst</CardTitle>
                <CardDescription>Acme Inc.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="icon-[ion--locate]"></span>
                  <p className="text-gray-500 dark:text-gray-400">London, UK</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="icon-[mdi--briefcase]"></span>

                  <p className="text-gray-500 dark:text-gray-400">Mid-level</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="icon-[mdi--tag]"></span>
                  <p className="text-gray-500 dark:text-gray-400">
                    SQL, Python, Tableau
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="mr-2">
                  View Job
                </Button>
                <Button>Apply</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>DevOps Engineer</CardTitle>
                <CardDescription>Acme Inc.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="icon-[ion--locate]"></span>
                  <p className="text-gray-500 dark:text-gray-400">Remote</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="icon-[mdi--briefcase]"></span>

                  <p className="text-gray-500 dark:text-gray-400">Senior</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="icon-[mdi--tag]"></span>
                  <p className="text-gray-500 dark:text-gray-400">
                    AWS, Docker, Kubernetes
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="mr-2">
                  View Job
                </Button>
                <Button>Apply</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Product Manager</CardTitle>
                <CardDescription>Acme Inc.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="icon-[ion--locate]"></span>
                  <p className="text-gray-500 dark:text-gray-400">
                    New York, NY
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="icon-[mdi--briefcase]"></span>

                  <p className="text-gray-500 dark:text-gray-400">Mid-level</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="icon-[mdi--tag]"></span>
                  <p className="text-gray-500 dark:text-gray-400">
                    Product Management, Agile, Jira
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="mr-2">
                  View Job
                </Button>
                <Button>Apply</Button>
              </CardFooter>
            </Card>
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
