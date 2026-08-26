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
    const {carDistance,bikeDistance,busDistance,trainDistance
        ,flightDistance,
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

    return Response.json({message:"Task Successfull"},{status:200});




}