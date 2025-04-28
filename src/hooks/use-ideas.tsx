import { Idea, sortOptions, SortOption } from "@/types";
import { useMemo, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { toast } from "sonner";

export const useIdeas = () => {
  const [ideasMap, setIdeasMap] = useLocalStorage<Record<string, Idea>>(
    "ideas",
    {}
  );

  const getSortFromUrl = (): SortOption => {
    const urlSort = new URLSearchParams(window.location.search).get("sort");

    if (urlSort && (sortOptions as readonly string[]).includes(urlSort)) {
      return urlSort as SortOption;
    }

    return "creation-date-asc";
  };

  const [sort, _setSort] = useState<SortOption>(getSortFromUrl());

  // used to track the newly created idea for animation purposes
  const [latestId, setLatestId] = useState<string | null>(null);

  const removeIdea = (id: string) => {
    setIdeasMap((prev) => {
      const newIdeasMap = { ...prev };
      delete newIdeasMap[id];
      return newIdeasMap;
    });

    toast.message("Idea deleted", {
      description: "The idea was removed from your board.",
    });
  };

  const addIdea = (values: Omit<Idea, "id" | "createdAt" | "updatedAt">) => {
    const timestamp = +new Date();
    const id = `${+timestamp}`;
    setLatestId(id);
    setIdeasMap((prev) => {
      return {
        ...prev,
        [id]: {
          ...values,
          id,
          createdAt: timestamp,
          updatedAt: timestamp,
        },
      };
    });
    setTimeout(() => setLatestId(null), 1500);
    toast.message("Idea added", {
      description: "Your new idea has been successfully created.",
    });
  };

  const editIdea = (
    id: string,
    values: { title?: string; description?: string }
  ) => {
    const timestamp = +new Date();

    const existing = ideasMap[id];
    if (!existing) return;

    const isTitleSame =
      values.title === undefined || values.title === existing.title;
    const isDescriptionSame =
      values.description === undefined ||
      values.description === existing.description;

    if (!isTitleSame || !isDescriptionSame) {
      setIdeasMap((prev) => {
        return {
          ...prev,
          [id]: {
            ...prev[id],
            ...values,
            updatedAt: timestamp,
          },
        };
      });

      toast.message("Idea updated", {
        description: "Changes to the idea have been saved.",
      });
    }
  };

  const setSortUrl = (sortOption: SortOption) => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("sort") !== sortOption) {
      url.searchParams.set("sort", sortOption);
      window.history.pushState({}, "", url);
    }
  };

  const setSort = (sortOption: SortOption) => {
    setSortUrl(sortOption);
    _setSort(sortOption);
  };

  const ideas = useMemo(() => {
    return Object.values(ideasMap).sort((a, b) => {
      switch (sort) {
        case "creation-date-asc":
          return a.createdAt < b.createdAt ? -1 : 1;
        case "creation-date-desc":
          return a.createdAt > b.createdAt ? -1 : 1;
        case "title-asc":
          return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1;
        case "title-desc":
          return b.title.toLowerCase() < a.title.toLowerCase() ? -1 : 1;
      }
    });
  }, [ideasMap, sort]);

  return {
    ideas,
    setIdeasMap,
    addIdea,
    editIdea,
    removeIdea,
    sort,
    setSort,
    latestId,
  };
};
