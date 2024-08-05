import { useState } from "react";
import Image from "next/image";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import { useRouter, usePathname } from "next/navigation";
import { EditTaleControlsProps } from "@/Types";
import { useEditContext } from "@/providers/EditProvider";

const EditTaleControls: React.FC<EditTaleControlsProps> = ({
  taleId,
  taleTitle,
  taleDescription,
  imageStorageId,
  audioStorageId,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [editedTitle, setEditedTitle] = useState(taleTitle);
  const [editedDescription, setEditedDescription] = useState(taleDescription);
  const deleteTale = useMutation(api.tales.deleteTale);
  const editTale = useMutation(api.tales.editTale);

  const { activeTaleId, setActiveTaleId } = useEditContext();

  const handleDelete = async () => {
    if (!imageStorageId || !audioStorageId) {
      toast({
        title: "Error deleting tale",
        variant: "destructive",
        description: "Missing storage IDs",
      });
      return;
    }
    try {
      await deleteTale({ taleId, imageStorageId, audioStorageId });
      toast({
        title: "Tale deleted successfully",
      });
      if (pathname !== "/admin") {
        router.push("/");
      }
    } catch (error) {
      console.error("Error deleting tale", error);
      toast({
        title: "Error deleting tale",
        variant: "destructive",
      });
    }
  };

  const handleEdit = async () => {
    if (!imageStorageId) {
      toast({
        title: "Error editing tale",
        variant: "destructive",
        description: "Missing storage IDs",
      });
      return;
    }
    try {
      await editTale({
        taleId,
        taleTitle: editedTitle,
        taleDescription: editedDescription,
      });
      toast({
        title: "Tale edited successfully",
      });
    } catch (error) {
      console.error("Error editing tale", error);
      toast({
        title: "Error editing tale",
        variant: "destructive",
      });
    }
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      setActiveTaleId(null);
    }
  };

  const isEditing = activeTaleId === taleId;

  return (
    <div className="flex alingn-center justify-center relative">
      <Image
        src="/icons/settings.svg"
        width={22}
        height={22}
        alt="Tale edit icon"
        className={`cursor-pointer transition-transform duration-300 ${isEditing ? "rotate-45" : ""}`}
        onClick={() => setActiveTaleId(isEditing ? null : taleId)}
      />
      {isEditing && (
        <div className="flex flex-col gap-1 absolute -left-36 -top-1 z-10 w-32 p-2 rounded-md bg-black-3">
          <AlertDialog onOpenChange={handleDialogOpenChange}>
            <AlertDialogTrigger>
              <div className="flex cursor-pointer justify-center gap-2 rounded-md bg-black-2 py-1.5 hover:bg-black-1 transition-all duration-500">
                <Image
                  src="/icons/edit.svg"
                  width={14}
                  height={14}
                  alt="Edit icon"
                />
                <p className="text-sm font-normal text-white-1">Edit</p>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Edit Tale</AlertDialogTitle>
                <AlertDialogDescription>
                  <div className="flex flex-col gap-1">
                    <Input
                      className="input-class py-6 focus-visible:ring-offset-violet-600"
                      placeholder="Title"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <Textarea
                      className="input-class focus-visible:ring-offset-violet-600"
                      placeholder="Description"
                      rows={5}
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    />
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleEdit}>Save</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog onOpenChange={handleDialogOpenChange}>
            <AlertDialogTrigger>
              <div className="flex cursor-pointer justify-center gap-2 rounded-md bg-black-2 py-1.5 hover:bg-red-600 transition-all duration-500">
                <Image
                  src="/icons/delete.svg"
                  width={14}
                  height={14}
                  alt="Delete icon"
                />
                <p className="text-sm font-normal text-white-1">Delete</p>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this tale? This action cannot
                  be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
};

export default EditTaleControls;
