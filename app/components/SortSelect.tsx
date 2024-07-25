import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const SortSelect = ({
  searchParams: { search = "", page = "1", sort = "date" },
}: {
  searchParams: { search?: string; page?: string; sort?: string };
}) => {
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState(sort);

  // Update the URL when the selectedValue changes
  useEffect(() => {
    const params = new URLSearchParams({
      search,
      page: page.toString(),
      sort: selectedValue,
    });
    router.push(`?${params.toString()}`);
  }, [selectedValue, search, page, router]);

  return (
    <div className="flex w-96 items-center gap-2.5">
      <Label className="text-16 font-bold text-white-1 w-36 text-right">
        Filter by:
      </Label>
      <Select
        defaultValue="date"
        onValueChange={(value) => setSelectedValue(value)}
      >
        <SelectTrigger className="text-16 w-full border-none bg-black-2 text-gray-1">
          <SelectValue
            placeholder={
              selectedValue === "date" ? "Most recent" : "Select value"
            }
          />
        </SelectTrigger>
        <SelectContent className="text-16 border-none bg-black-2 text-white-1 focus:ring-violet-600">
          <SelectItem className="focus:bg-purple-600" key="1" value="date">
            Most reacent
          </SelectItem>
          <SelectItem className="focus:bg-purple-600" key="2" value="views">
            Views
          </SelectItem>
          <SelectItem className="focus:bg-purple-600" key="3" value="AZ">
            A-Z
          </SelectItem>
          <SelectItem className="focus:bg-purple-600" key="4" value="ZA">
            Z-A
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortSelect;
