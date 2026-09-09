import {create} from "zustand";
import {toast} from "react-hot-toast";
export const useActivityStore = create((set) => ({
    data: null,
    todaysDataAvailable:false,
    allActivities:null,
    addActivity: async (activity:any) => {
        toast.loading('Adding activity...');
        try{
            const response = await fetch('/api/postactivity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(activity),
            }); 

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add activity');
            }
 
            const data = await response.json();
            toast.dismiss(); // Dismiss the loading toast
            toast.success('Activity added successfully');
            set({data: data}); // Update the store with the new activity data
            return data;
        }

        catch (error) {
            console.error('Error adding activity:', error);
            toast.dismiss(); // Dismiss the loading toast
            toast.error('Failed to add activity');
        }
                    
    }
    ,
    getDataByDate: async ()=>{
        set({todaysDataAvailable:false})
        try {
            const res = await fetch('/api/getactivitybydate');

            if(!res.ok){
                console.log("failed fetching data")
            }
            const data = await res.json();
            console.log(data)

            set({data:data})
            set({todaysDataAvailable:true})
        } catch (error) {
            console.log(error)
        }
    },

    getActivities:async()=>{
        try {
            const res = await fetch('/api/getactivity');
            if(!res.ok){
                console.log('failed fetching data');
            }
            const data = await res.json();
            console.log(data);
            set({allActivities:data.data})

        } catch (error) {
            console.log(error);
        }
    }

}));