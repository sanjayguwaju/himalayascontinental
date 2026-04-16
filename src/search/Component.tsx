"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { useDebounce } from "@/utilities/useDebounce";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { Search as SearchIcon, X } from "lucide-react";

export const Search: React.FC = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [value, setValue] = useState(initialQuery);
  const router = useRouter();
  const lastPushed = React.useRef<string>(initialQuery);

  const debouncedValue = useDebounce(value, 600);

  // Safely sync value if URL changes externally (i.e. clicking a Link badge)
  useEffect(() => {
    const urlQuery = searchParams.get("q") ?? "";
    if (urlQuery !== lastPushed.current) {
      setValue(urlQuery);
      lastPushed.current = urlQuery;
    }
  }, [searchParams]);

  useEffect(() => {
    // Prevent redundant pushing if the query hasn't fundamentally changed from our last push
    if (debouncedValue !== lastPushed.current) {
      lastPushed.current = debouncedValue;
      router.push(
        `/search${debouncedValue ? `?q=${encodeURIComponent(debouncedValue)}` : ""}` as Parameters<typeof router.push>[0],
        { scroll: false },
      );
    }
  }, [debouncedValue, router]);

  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        <Input
          id="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Search products, medicines, medical equipments…"
          className="pl-12 pr-12 h-14 text-base rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-500 focus-visible:border-[#0870b8] focus-visible:ring-1 focus-visible:ring-[#0870b8] shadow-sm transition-colors"
          autoComplete="off"
        />
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            onClick={() => setValue("")}
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
