import { ModeToggle } from "./mode-toggle";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  const { logout, user } = useAuth();
  const [toggleMenu, setToggleMenu] = useState(false);
  const location = useLocation(); // Obtener la ubicación actual

  // Definir una función que verifique si la ruta actual coincide con la ruta del link
  const isActive = (path) => location.pathname === path;

  return (
    <nav>
      <div className="fixed w-full h-16 top-0 flex justify-between bg-transparent backdrop-blur z-[1000] border-b p-5">
        <div className="flex gap-x-2 items-center">
          <Link to="/home">
            <h1 className="text-3xl font-bold">DevRank</h1>
          </Link>
        </div>

        <div className="hidden sm:flex gap-8 items-center">
          <div className={`navbar-link ${isActive("/home") ? "active" : ""}`}>
            <Link
              to="/home"
              className="icon-[mdi--home] text-2xl hover:text-secondary"
            ></Link>
          </div>
          <div className={`navbar-link ${isActive("/offers") ? "active" : ""}`}>
            <Link
              to="/offers"
              className="icon-[mdi--briefcase] text-2xl hover:text-secondary"
            ></Link>
          </div>
          <div
            className={`navbar-link ${isActive("/challenges") ? "active" : ""}`}
          >
            <Link
              to="/challenges"
              className="icon-[mdi--terminal] text-2xl hover:text-secondary"
            ></Link>
          </div>
          <div
            className={`navbar-link ${
              isActive("/leaderboard") ? "active" : ""
            }`}
          >
            <Link
              to="/leaderboard"
              className="icon-[mdi--trophy] text-2xl hover:text-secondary"
            ></Link>
          </div>
        </div>

        <div className="hidden sm:flex gap-8 items-center">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user.profileImage.url} />
                  <AvatarFallback>{user.userName[0]}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/*" onClick={logout}>
                    Log out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button>
                <Link to="/login" className="hover:text-secondary">
                  Log In
                </Link>
              </Button>
              <Button variant="outline">
                <Link to="/register" className="hover:text-secondary">
                  Register
                </Link>
              </Button>
            </>
          )}
          <ModeToggle />
        </div>
        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setToggleMenu(!toggleMenu)}
            className="icon-[mdi--menu] text-3xl hover:text-secondary"
          ></button>
        </div>
      </div>

      <div
        className={`fixed z-40 w-full overflow-hidden flex flex-col justify-between bg-transparent backdrop-blur lg:hidden gap-12 origin-top duration-700 ${
          !toggleMenu ? "h-0" : "h-full"
        }`}
      >
        <div className="flex flex-col gap-12 text-left px-10 py-24">
          <div className="flex flex-col gap-8">
            <div className={`navbar-link ${isActive("/home") ? "active" : ""}`}>
              <Link
                to="/home"
                className="flex items-center text-4xl hover:text-secondary"
              >
                <span className="icon-[mdi--home] mr-2"></span> Home
              </Link>
            </div>
            <div
              className={`navbar-link ${isActive("/offers") ? "active" : ""}`}
            >
              <Link
                to="/offers"
                className="flex items-center text-4xl hover:text-secondary"
              >
                <span className="icon-[mdi--briefcase] mr-2"></span> Offers
              </Link>
            </div>
            <div
              className={`navbar-link ${
                isActive("/challenges") ? "active" : ""
              }`}
            >
              <Link
                to="/challenges"
                className="flex items-center text-4xl hover:text-secondary"
              >
                <span className="icon-[mdi--terminal] mr-2"></span> Challenges
              </Link>
            </div>
            <div
              className={`navbar-link ${
                isActive("/leaderboard") ? "active" : ""
              }`}
            >
              <Link
                to="/leaderboard"
                className="flex items-center text-4xl hover:text-secondary"
              >
                <span className="icon-[mdi--trophy] mr-2"></span> Leaderboard
              </Link>
            </div>
          </div>

          {user ? (
            <div className="flex flex-col gap-8">
              <div
                className={`navbar-link ${
                  isActive("/profile") ? "active" : ""
                }`}
              >
                <Link
                  to="/profile"
                  className="flex items-center text-4xl hover:text-secondary"
                >
                  <Avatar className="mr-2">
                    <AvatarImage src={user.profileImage.url} />
                    <AvatarFallback>{user.userName[0]}</AvatarFallback>
                  </Avatar>
                  Profile
                </Link>
              </div>
              <button
                onClick={logout}
                className="flex items-center text-4xl hover:text-secondary"
              >
                <span className="icon-[mdi--logout] mr-2"></span> Log out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              <Button>
                <div
                  className={`navbar-link ${
                    isActive("/login") ? "active" : ""
                  }`}
                >
                  <Link
                    to="/login"
                    className="flex items-center text-4xl hover:text-secondary"
                  >
                    <span className="icon-[mdi--login] mr-2"></span> Log In
                  </Link>
                </div>
              </Button>
              <Button>
                <div
                  className={`navbar-link ${
                    isActive("/register") ? "active" : ""
                  }`}
                >
                  <Link
                    to="/register"
                    className="flex items-center text-4xl hover:text-secondary"
                  >
                    <span className="icon-[mdi--account-plus] mr-2"></span>{" "}
                    Register
                  </Link>
                </div>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
