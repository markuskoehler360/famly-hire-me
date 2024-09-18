import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Child } from "../models/models";
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
const headers = new Headers();
headers.append("Content-Type", "application/json");

interface CachedData {
  children: Child[];
}

export const useChildrenData = () => {
  const groupId = "86413ecf-01a1-44da-ba73-1aeda212a196";
  const institutionId = "dc4bd858-9e9c-4df7-9386-0d91e42280eb";

  const fetchChildren = () => {
    return fetch(
      `https://app.famly.co/api/daycare/tablet/group?accessToken=${accessToken}&groupId=${groupId}&institutionId=${institutionId}`
    ).then((res) => res.json());
  };

  return useQuery({
    queryKey: ["children"],
    queryFn: () => fetchChildren(),
  });
};

export const useCheckinChild = () => {
  const queryClient = useQueryClient();

  type CheckinChildParams = {
    id: string;
    pickupTime: string;
  };

  const checkinChild = async ({ id, pickupTime }: CheckinChildParams) => {
    const response = await fetch(
      `https://app.famly.co/api/v2/children/${id}/checkins`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ pickupTime, accessToken }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

  return useMutation({
    mutationFn: checkinChild,
    onSuccess: (data: Child) => {
      queryClient.setQueryData(["children"], (oldData: CachedData) => {
        return {
          children: oldData.children.map((child) =>
            child.childId === data.childId
              ? {
                  ...child,
                  checkedIn: true,
                  checkinTime: data.checkinTime,
                }
              : child
          ),
        };
      });
    },
  });
};

export const useCheckoutChild = () => {
  const queryClient = useQueryClient();

  const checkoutChild = async (id: string) => {
    const response = await fetch(
      `https://app.famly.co/api/v2/children/${id}/checkout`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ accessToken }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

  return useMutation({
    mutationFn: checkoutChild,
    onSuccess: (data: Child[]) => {
      queryClient.setQueryData(["children"], (oldData: CachedData) => {
        return {
          children: oldData.children.map((child) =>
            child.childId === data[0].childId
              ? {
                  ...child,
                  checkedIn: false,
                }
              : child
          ),
        };
      });
    },
  });
};
