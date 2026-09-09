import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { headers } from "next/headers"

// emission factors

import {
  carEF,
  bikeEF,
  busEF,
  trainEF,
  flightEF,
  electricityEF,
  lpgEF,
  naturalGasEF,
  chickenEF,
  vegMealsEF,
  dairyEF,
  plasticEF,
  paperEF,
  organicEF,
  othersEF,
} from '@/lib/utils'  

export async function POST(request:Request){
    const {carDistance = 0,bikeDistance = 0,busDistance = 0,trainDistance = 0
        ,flightDistance = 0,
        electricity = 0,
        lpg = 0,
        naturalGas = 0,
        chicken = 0,
        vegMeals = 0,
        dairy = 0,
        plastic = 0,
        paper = 0,
        organic = 0,
        others = 0,
    } = await request.json()

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session?.user?.id) {
        return new Response(JSON.stringify({message:"Unauthorized"}),{status:401})
    }

    if(!carDistance && !bikeDistance && !busDistance && !trainDistance && !flightDistance && !electricity && !lpg && !naturalGas && !chicken && !vegMeals && !dairy && !plastic && !paper && !organic && !others){
        return new Response(JSON.stringify({message:"Please fill at least one field"}),{status:400})
    }

    const totalTransport = (carDistance * carEF) + (bikeDistance * bikeEF) + (busDistance * busEF) + (trainDistance * trainEF) + (flightDistance * flightEF);
    const totalEnergy = (electricity * electricityEF) + (lpg * lpgEF) + (naturalGas * naturalGasEF);
    const totalFood = (chicken * chickenEF) + (vegMeals * vegMealsEF) + (dairy * dairyEF);
    const totalWaste = (plastic * plasticEF) + (paper * paperEF) + (organic * organicEF) + (others * othersEF);
    const totalEmission = totalTransport + totalEnergy + totalFood + totalWaste;

    

    const activity = await prisma.activity.create({
        data:{
            carDistance,
            bikeDistance,
            busDistance,
            trainDistance,
            flightDistance,
            electricity,
            lpg,
            naturalGas,
            chicken,
            vegMeals,
            dairy,
            plastic,
            paper,
            organic,
            others,
            totalEmission,
            totalEnergy,
            totalFood,
            totalTransport,
            totalWaste,
            userId:session?.user?.id
        }
    })

    return Response.json(
    {
        data: activity,
        message: "Task Successful",
    },
    {
        status: 200,
    }
);




}