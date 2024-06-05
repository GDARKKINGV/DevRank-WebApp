import { useForm } from "react-hook-form";
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
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: authErrors } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = handleSubmit(async (data) => {
    await signup(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/login");
  }, [isAuthenticated]);

  useEffect(() => {
    authErrors.forEach((error) => {
      console.log(error);
      toast({
        variant: "destructive",
        description: error,
      });
    });
  }, [authErrors]);

  return (
    <>
      <Navbar />
      <div className="flex h-screen items-center justify-center mt-8">
        <Card className="w-[350px] shadow-md">
          <CardHeader>
            <CardTitle>Register</CardTitle>
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
                    placeholder="User name"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label>Name</Label>
                  {errors.name && (
                    <CardDescription className="text-red-500">
                      Name is required
                    </CardDescription>
                  )}
                  <Input
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Name"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label>Last name</Label>
                  {errors.lastName && (
                    <CardDescription className="text-red-500">
                      Last name is required
                    </CardDescription>
                  )}
                  <Input
                    type="text"
                    {...register("lastName", { required: true })}
                    placeholder="Last name"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label>E-mail</Label>
                  {errors.email && (
                    <CardDescription className="text-red-500">
                      E-mail is required
                    </CardDescription>
                  )}
                  <Input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="E-mail"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label>Password (more than 8 characters)</Label>
                  {errors.password && (
                    <CardDescription className="text-red-500">
                      Password is required
                    </CardDescription>
                  )}
                  <Input
                    type="password"
                    {...register("password", { required: true })}
                    placeholder="Password"
                  />
                </div>
                <Button type="submit" variant="secondary">
                  Register
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            Are you already on DevRank?
            <Link to="/login" className={buttonVariants({ variant: "link" })}>
              Log in
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
