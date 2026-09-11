import { create } from "zustand";
import { toast } from "react-hot-toast";

type ActivityStore = {
  data: any;
  todaysDataAvailable: boolean;
  allActivities: any;
  recommendations: any;
  recommendationsLoading: boolean;

  addActivity: (activity: any) => Promise<any>;
  getDataByDate: () => Promise<void>;
  getActivities: () => Promise<void>;
  getRecommendations: (activity: any) => Promise<any>;
};

export const useActivityStore = create<ActivityStore>((set) => ({
  data: null,
  todaysDataAvailable: false,
  allActivities: null,

  recommendations: null,
  recommendationsLoading: false,

  addActivity: async (activity: any) => {
    toast.loading("Adding activity...");

    try {
      const response = await fetch("/api/postactivity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(activity),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add activity");
      }

      const data = await response.json();

      toast.dismiss();
      toast.success("Activity added successfully");

      set({ data });

      return data;
    } catch (error) {
      console.error("Error adding activity:", error);
      toast.dismiss();
      toast.error("Failed to add activity");
    }
  },

  getDataByDate: async () => {
    set({ todaysDataAvailable: false });

    try {
      const res = await fetch("/api/getactivitybydate");

      if (!res.ok) {
        console.log("failed fetching data");
        return;
      }

      const data = await res.json();

      set({
        data,
        todaysDataAvailable: true,
      });
    } catch (error) {
      console.log(error);
    }
  },

  getActivities: async () => {
    try {
      const res = await fetch("/api/getactivity");

      if (!res.ok) {
        console.log("failed fetching data");
        return;
      }

      const data = await res.json();

      set({
        allActivities: data.data,
      });
    } catch (error) {
      console.log(error);
    }
  },

  getRecommendations: async (activity: any) => {
    set({ recommendationsLoading: true });

    try {
      const res = await fetch("/api/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ activity }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(
          errData.message || "Failed to get recommendations"
        );
      }

      const data = await res.json();

      set({
        recommendations: data.recommendations,
        recommendationsLoading: false,
      });

      return data;
    } catch (error) {
      console.error("Error getting recommendations:", error);
      toast.error("Failed to generate recommendations");

      set({
        recommendationsLoading: false,
      });
    }
  },
}));