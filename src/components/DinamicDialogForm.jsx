import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

export default function DinamicDialogForm({ fields, label, onSubmitHandler }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();

    fields.forEach(({ name, type }) => {
      if (type === "file" && data[name].length > 0) {
        formData.append(name, data[name][0]);
      } else {
        formData.append(name, data[name]);
      }
    });

    onSubmitHandler(formData);
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{label}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} form={label + "-form"}>
          {fields.map(({ name, label, type, validation, defaultValue }) => (
            <div key={name} className="my-4">
              <Label htmlFor={name}>{label}</Label>
              {errors[name] && (
                <DialogDescription className="text-destructive my-1">
                  {label} is required
                </DialogDescription>
              )}
              {type === "textarea" ? (
                <Textarea
                  id={name}
                  className="bg-secondary"
                  {...register(name, { ...validation, value: defaultValue })}
                />
              ) : (
                <Input
                  id={name}
                  className="bg-secondary"
                  type={type}
                  defaultValue={defaultValue}
                  {...register(name, validation)}
                />
              )}
            </div>
          ))}
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button type="submit">Save</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
