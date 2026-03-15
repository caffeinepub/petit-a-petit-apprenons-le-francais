import { useQuery } from "@tanstack/react-query";
import type { Achievement, Review } from "../backend.d";
import { useActor } from "./useActor";

export function useAchievements() {
  const { actor, isFetching } = useActor();
  return useQuery<Achievement[]>({
    queryKey: ["achievements"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAchievements();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useReviews() {
  const { actor, isFetching } = useActor();
  return useQuery<Review[]>({
    queryKey: ["reviews"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getReviews();
    },
    enabled: !!actor && !isFetching,
  });
}
