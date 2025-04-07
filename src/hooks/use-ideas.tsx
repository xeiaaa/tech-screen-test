import { Idea } from "@/types";
import { useMemo, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { toast } from "sonner";

export const useIdeas = () => {
  const [ideasMap, setIdeasMap] = useLocalStorage<Record<string, Idea>>(
    "ideas",
    {}
  );
  const [sort, setSort] = useLocalStorage<
    "creation-date-asc" | "creation-date-desc" | "title-asc" | "title-desc"
  >("sort", "creation-date-desc");
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
    const timestamp = new Date();
    const id = `${+timestamp}`;
    setLatestId(id);
    setIdeasMap((prev) => {
      return {
        ...prev,
        [id]: {
          ...values,
          id,
          createdAt: timestamp.toISOString(),
          updatedAt: timestamp.toISOString(),
        },
      };
    });
    setTimeout(() => setLatestId(null), 1500);
    toast.message("Idea added", {
      description: "Your new idea has been successfully created.",
      position: "top-right",
    });
  };

  const editIdea = (
    id: string,
    values: { title?: string; description?: string }
  ) => {
    const timestamp = new Date();

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
            updatedAt: timestamp.toISOString(),
          },
        };
      });

      toast.message("Idea updated", {
        description: "Changes to the idea have been saved.",
      });
    }
  };

  const ideas = useMemo(() => {
    return Object.values(ideasMap).sort((a, b) => {
      switch (sort) {
        case "creation-date-asc":
          return +new Date(a.createdAt) < +new Date(b.createdAt) ? -1 : 1;
        case "creation-date-desc":
          return +new Date(a.createdAt) > +new Date(b.createdAt) ? -1 : 1;
        case "title-asc":
          return a.title < b.title ? -1 : 1;
        case "title-desc":
          return b.title < a.title ? -1 : 1;
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
