import { Link, useNavigate } from "react-router-dom";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, isAuthenticated, errors: authErrors } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = handleSubmit(async (data) => {
    await signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, [isAuthenticated]);

  useEffect(() => {
    authErrors?.forEach((error) => {
      toast({
        variant: "destructive",
        description: error,
      });
    });
  }, [authErrors]);

  return (
    <>
      <Navbar />
      <div className="flex h-screen items-center justify-center">
        <Card className="w-[350px] shadow-md">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-2">
                  <Label>User name</Label>
                  {errors.userName && (
                    <CardDescription className="text-red-500">
                      User name is required
                    </CardDescription>
                  )}
                  <Input
                    type="text"
                    {...register("userName", { required: true })}
                    placeholder="user name"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label>Password</Label>
                  {errors.password && (
                    <CardDescription className="text-red-500">
                      Password is required
                    </CardDescription>
                  )}
                  <Input
                    type="password"
                    {...register("password", { required: true })}
                    placeholder="password"
                  />
                </div>
                <Button type="submit" variant="secondary">
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            Don't have an account?
            <Link
              to="/register"
              className={buttonVariants({ variant: "link" })}
            >
              Register
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
