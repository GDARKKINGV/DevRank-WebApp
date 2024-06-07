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
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { getOffersRequest } from "@/api/offers";

export default function OffersPage() {
  const [offers, setOffers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { toast } = useToast();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await getOffersRequest(page, 6, searchTerm);
        setOffers(res.data.offers);
        setTotalPages(Math.ceil(res.data.totalOffers / 6));
      } catch (error) {
        toast({
          variant: "destructive",
          description: error.message,
        });
      }
    };

    fetchOffers();
  }, [page, searchTerm]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      console.log(i);
      console.log(page);
      console.log(totalPages);
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

  const handleApplyToOffer = (id) => {
    toast({
      description: "You have successfully applied to this offer.",
    });
    console.log(`Applying to offer with id: ${id}`);
  };

  return (
    <div>
      <Navbar />
      <div className="px-6">
        <div className="px-10 pb-4">
          <div className="flex items-center gap-6 my-6">
            <form className="flex-1 max-w-xs">
              <Input
                placeholder="Search Offers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.length === 0
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
              : offers.map((offer) => (
                  <Card key={offer.id}>
                    <CardHeader>
                      <CardTitle>{offer.position}</CardTitle>
                      <CardDescription>{offer.company.name}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="icon-[ion--locate]"></span>
                        <p className="text-gray-500 dark:text-gray-400">
                          {offer.location.country} - {offer.location.city}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="icon-[mdi--briefcase]"></span>
                        <p className="text-gray-500 dark:text-gray-400">
                          {offer.level}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="icon-[mdi--tag]"></span>
                        <p className="text-gray-500 dark:text-gray-400">
                          {offer.skills.map((skill) => skill.skill).join(", ")}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="">Apply</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you sure you want to apply to this offer?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. Make sure you want
                              to apply.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleApplyToOffer(offer.id)}
                            >
                              Apply
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </CardFooter>
                  </Card>
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
