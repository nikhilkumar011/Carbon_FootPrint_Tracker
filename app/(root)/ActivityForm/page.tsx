"use client";

import { authClient } from "@/lib/auth-client";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Car } from "lucide-react";
import { FaBoltLightning, FaBowlRice, FaBucket, FaBus, FaCar, FaCarSide, FaDumpster, FaFire, FaGasPump, FaLeaf, FaMotorcycle, FaPlane, FaRegNewspaper, FaSheetPlastic, FaTrain } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { GiChickenLeg } from "react-icons/gi";
import { IoLeafOutline } from "react-icons/io5";
import { LuMilk } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { ChartRadialText } from "@/components/chart-radial-text";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";
import { useEffect, useState } from "react";
import { useActivityStore } from "@/stores/useActivityStore";


type NumericInput = string;


//emission = 25 * emission factor
//khana = 1 * emission factor for khana


const ActivityForm = () => {
    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()

    const [carDistance, setCarDistance] = useState<NumericInput>("");
    const [bikeDistance, setBikeDistance] = useState<NumericInput>("");
    const [busDistance, setBusDistance] = useState<NumericInput>("");
    const [trainDistance, setTrainDistance] = useState<NumericInput>("");
    const [flightDistance, setFlightDistance] = useState<NumericInput>("");
    const [electricty, setElectricty] = useState<NumericInput>("");
    const [lpg, setLpg] = useState<NumericInput>("");
    const [naturalGas, setNaturalGas] = useState<NumericInput>("");
    const [chicken, setChicken] = useState<NumericInput>("");
    const [vegMeal, setVegMeal] = useState<NumericInput>("");
    const [dairy, setDairy] = useState<NumericInput>("");
    const [plastic, setPlastic] = useState<NumericInput>("");
    const [paper, setPaper] = useState<NumericInput>("");
    const [organic, setOrganic] = useState<NumericInput>("");
    const [other, setOther] = useState<NumericInput>("");




    const { addActivity, data,getDataByDate,todaysDataAvailable } = useActivityStore();
    const activityData = data?.data;
    const categories = [
        {
            label: "Transport",
            value: activityData?.totalTransport.toString().slice(0,4) ?? 0,
            icon: FaCar,
        },
        {
            label: "Food",
            value: activityData?.totalFood.toString().slice(0,4) ?? 0,
            icon: FaBowlRice,
        },
        {
            label: "Energy",
            value: activityData?.totalEnergy.toString().slice(0,4) ?? 0,
            icon: FaBoltLightning,
        },
        {
            label: "Waste",
            value: activityData?.totalWaste.toString().slice(0,4) ?? 0,
            icon: FaBucket,
        },
    ];

    useEffect(()=>{
        getDataByDate();
       
    },[])

    useEffect(() => {
    if (!todaysDataAvailable || !activityData) return;

    setCarDistance(activityData.carDistance.toString());
    setBikeDistance(activityData.bikeDistance.toString());
    setBusDistance(activityData.busDistance.toString());
    setTrainDistance(activityData.trainDistance.toString());
    setFlightDistance(activityData.flightDistance.toString());
    setElectricty(activityData.electricity.toString());
    setLpg(activityData.lpg.toString());
    setNaturalGas(activityData.naturalGas.toString());
    setChicken(activityData.chicken.toString());
    setVegMeal(activityData.vegMeals.toString());
    setDairy(activityData.dairy.toString());
    setPlastic(activityData.plastic.toString());
    setPaper(activityData.paper.toString());
    setOrganic(activityData.organic.toString());
    setOther(activityData.others.toString());

}, [todaysDataAvailable, activityData]);

    const handleSubmit = async () => {
        const toNumber = (value: NumericInput) => value === "" ? 0 : Number(value);
        const activity = {
            carDistance: toNumber(carDistance),
            bikeDistance: toNumber(bikeDistance),
            busDistance: toNumber(busDistance),
            trainDistance: toNumber(trainDistance),
            flightDistance: toNumber(flightDistance),
            electricity: toNumber(electricty),
            lpg: toNumber(lpg),
            naturalGas: toNumber(naturalGas),
            chicken: toNumber(chicken),
            vegMeals: toNumber(vegMeal),
            dairy: toNumber(dairy),
            plastic: toNumber(plastic),
            paper: toNumber(paper),
            organic: toNumber(organic),
            others: toNumber(other),
        };

        await addActivity(activity);
    };

    return (
        <div>
            <header className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-wrap justify-between px-5 flex-col md:flex-row items-center">
                    <a className="flex flex-col title-font font-medium  text-gray-900 mb-4 md:mb-0">
                        <span className="font-semibold text-xl">Add Activity</span>
                        <p className='font-light text-gray-600'>Track your daily activities to track your carbon Footprint</p>
                    </a>

                    <div className="p-3 flex gap-2 items-center justify-center">
                        {session?.user?.image && (
                            <img src={session?.user?.image} alt="" className="h-8 rounded-full" />
                        )}
                        {
                            !session?.user?.image && (
                                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                                    <span className="text-gray-600 font-semibold text-lg">
                                        {session?.user?.name?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )
                        }


                        <p className="text-lg font-light">
                            {session?.user?.name}
                        </p>
                    </div>
                </div>
            </header>
            <hr />
            <div className="p-4 flex  flex-col md:flex-row gap-3 w-full">
                <div className="w-full flex flex-col gap-2 md:w-[60%]">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <div className="flex gap-3">
                                    <FaCar className="mt-2 text-green-700" />
                                    <div className="flex flex-col">
                                        <h1 className="text-lg  font-semibold">1.Transport</h1>
                                        <p className="text-gray-400">  Distance traveled today</p>
                                    </div>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex gap-2">
                                    <FaCarSide className="text-4xl text-green-700 bg-green-100 rounded p-2" />
                                    <div className="flex flex-col gap-1">
                                        <p className="text-gray-500">Car (KM)</p>
                                        <Input
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="0"
                                            className="border-gray-400"
                                            value={carDistance}
                                            onChange={(e) => setCarDistance(e.target.value)}
                                        />
                                    </div>

                                </div>
                                <div className="flex gap-2">
                                    <FaMotorcycle className="text-4xl text-green-700 bg-green-100 rounded p-2" />
                                    <div className="flex flex-col gap-1">
                                        <p className="text-gray-500">Bike (KM)</p>
                                        <Input
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="0"
                                            className="border-gray-400 "
                                            value={bikeDistance}
                                            onChange={(e) => setBikeDistance(e.target.value)}
                                        />
                                    </div>

                                </div>
                                <div className="flex gap-2">
                                    <FaBus className="text-4xl text-green-700 bg-green-100 rounded p-2" />
                                    <div className="flex flex-col gap-1">
                                        <p className="text-gray-500">Bus (KM)</p>
                                        <Input
                                            className="border-gray-400 "
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="0"
                                            value={busDistance}
                                            onChange={(e) => setBusDistance(e.target.value)}
                                        />
                                    </div>

                                </div>
                                <div className="flex gap-2">
                                    <FaTrain className="text-4xl text-green-700 bg-green-100 rounded p-2" />
                                    <div className="flex flex-col gap-1">
                                        <p className="text-gray-500">Train (KM)</p>
                                        <Input
                                            className="border-gray-400 "
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="0"
                                            value={trainDistance}
                                            onChange={(e) => setTrainDistance(e.target.value)}
                                        />
                                    </div>

                                </div>
                                <div className="flex gap-2">
                                    <FaPlane className="text-4xl text-green-700 bg-green-100 rounded p-2" />
                                    <div className="flex flex-col gap-1">
                                        <p className="text-gray-500">Flight (KM)</p>
                                        <Input
                                            className="border-gray-400 "
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="0"
                                            value={flightDistance}
                                            onChange={(e) => setFlightDistance(e.target.value)}
                                        />
                                    </div>

                                </div>


                            </div>
                        </CardContent>

                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <div className="flex gap-3">
                                    <FaBoltLightning className="mt-2 text-green-700" />
                                    <div className="flex flex-col">
                                        <h1 className="text-lg  font-semibold">2.Energy</h1>
                                        <p className="text-gray-400">  Energy Consumption Today</p>
                                    </div>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-2">

                                <div className="flex gap-2">
                                    <FaBoltLightning className="text-4xl text-green-700 bg-green-100 rounded p-2" />
                                    <div className="flex flex-col gap-1">
                                        <p className="text-gray-500">Electricty (KWH)</p>
                                        <Input
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="0"
                                            className="border-gray-400 "
                                            value={electricty}
                                            onChange={(e) => setElectricty(e.target.value)}
                                        />
                                    </div>

                                </div>
                                <div className="flex gap-2">
                                    <FaGasPump className="text-4xl text-green-700 bg-green-100 rounded p-2" />
                                    <div className="flex flex-col gap-1">
                                        <p className="text-gray-500">LPG (KG)</p>
                                        <Input
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="0"
                                            className="border-gray-400 "
                                            value={lpg}
                                            onChange={(e) => setLpg(e.target.value)}
                                        />
                                    </div>

                                </div>
                                <div className="flex gap-2">
                                    <FaFire className="text-4xl text-green-700 bg-green-100 rounded p-2" />
                                    <div className="flex flex-col gap-1">
                                        <p className="text-gray-500">Natural Gas (m3)</p>
                                        <Input
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="0"
                                            className="border-gray-400 "
                                            value={naturalGas}
                                            onChange={(e) => setNaturalGas(e.target.value)}
                                        />
                                    </div>

                                </div>


                            </div>
                        </CardContent>

                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <div className="flex gap-3">
                                    <FaBowlRice className="mt-2 text-green-700" />
                                    <div className="flex flex-col">
                                        <h1 className="text-lg  font-semibold">3.Food</h1>
                                        <p className="text-gray-400">  Food Consumption Today</p>
                                    </div>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-2">


                                <div className="flex gap-2">
                                    <GiChickenLeg className="text-4xl text-green-700 bg-green-100 rounded p-2" />
                                    <div className="flex flex-col gap-1">
                                        <p className="text-gray-500">Chicken (Servings)</p>
                                        <Input
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="0"
                                            className="border-gray-400 "
                                            value={chicken}
                                            onChange={(e) => setChicken(e.target.value)}
                                        />
                                    </div>

                                </div>
                                <div className="flex gap-2">
                                    <IoLeafOutline className="text-4xl text-green-700 bg-green-100 rounded p-2" />
                                    <div className="flex flex-col gap-1">
                                        <p className="text-gray-500">VegMeal (Servings)</p>
                                        <Input
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="0"
                                            className="border-gray-400 "
                                            value={vegMeal}
                                            onChange={(e) => setVegMeal(e.target.value)}
                                        />
                                    </div>

                                </div>
                                <div className="flex gap-2">
                                    <LuMilk className="text-4xl text-green-700 bg-green-100 rounded p-2" />
                                    <div className="flex flex-col gap-1">
                                        <p className="text-gray-500">Dairy (Servings)</p>
                                        <Input
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="0"
                                            className="border-gray-400 "
                                            value={dairy}
                                            onChange={(e) => setDairy(e.target.value)}
                                        />
                                    </div>

                                </div>


                            </div>
                        </CardContent>

                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <div className="flex gap-3">
                                    <FaBucket className="mt-2 text-green-700" />
                                    <div className="flex flex-col">
                                        <h1 className="text-lg  font-semibold">4.Waste</h1>
                                        <p className="text-gray-400">  Waste Generated Today</p>
                                    </div>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-4 gap-2">

                                <div className="flex gap-2">
                                    <FaSheetPlastic className="text-4xl text-green-700 bg-green-100 rounded p-2" />
                                    <div className="flex flex-col gap-1">
                                        <p className="text-gray-500">Plastic (KG)</p>
                                        <Input
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="0"
                                            className="border-gray-400 "
                                            value={plastic}
                                            onChange={(e) => setPlastic(e.target.value)}
                                        />
                                    </div>

                                </div>
                                <div className="flex gap-2">
                                    <FaRegNewspaper className="text-4xl text-green-700 bg-green-100 rounded p-2" />
                                    <div className="flex flex-col gap-1">
                                        <p className="text-gray-500">Paper (KG)</p>
                                        <Input
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="0"
                                            className="border-gray-400 "
                                            value={paper}
                                            onChange={(e) => setPaper(e.target.value)}
                                        />
                                    </div>

                                </div>
                                <div className="flex gap-2">
                                    <IoLeafOutline className="text-4xl text-green-700 bg-green-100 rounded p-2" />
                                    <div className="flex flex-col gap-1">
                                        <p className="text-gray-500">Organic (KG)</p>
                                        <Input
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="0"
                                            className="border-gray-400 "
                                            value={organic}
                                            onChange={(e) => setOrganic(e.target.value)}
                                        />
                                    </div>

                                </div>
                                <div className="flex gap-2">
                                    <FaDumpster className="text-4xl text-green-700 bg-green-100 rounded p-2" />
                                    <div className="flex flex-col gap-1">
                                        <p className="text-gray-500">Other (KG)</p>
                                        <Input
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="0"
                                            className="border-gray-400 "
                                            value={other}
                                            onChange={(e) => setOther(e.target.value)}
                                        />
                                    </div>

                                </div>


                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSubmit}> <FaLeaf /> Calculate and Save</Button>
                        </CardFooter>

                    </Card>
                </div>
                <div className="w-full md:w-[40%]">
                    <Card>
                        <CardHeader>
                            <CardTitle>Today's Summary</CardTitle>

                        </CardHeader>
                        <CardContent>
                            <ChartRadialText />
                        </CardContent>
                        <CardFooter>
                            <div className="flex w-full max-w-md flex-col gap-5">
                                <div className="w-full h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={categories}
                                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis
                                                dataKey="label"
                                                tick={{ fontSize: 12, fill: "#374151" }}
                                                axisLine={false}
                                                tickLine={false}
                                            />
                                            <YAxis
                                                tick={{ fontSize: 12, fill: "#374151" }}
                                                axisLine={false}
                                                tickLine={false}
                                            />
                                            <Tooltip
                                                cursor={{ fill: "rgba(21,128,61,0.08)" }}
                                                contentStyle={{
                                                    borderRadius: 8,
                                                    borderColor: "#bbf7d0",
                                                }}
                                            />
                                            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                                                {categories.map((item) => (
                                                    <Cell key={item.label} fill="#15803d" />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Legend row with icons, mirrors the old Progress labels */}
                                <div className="grid grid-cols-2 gap-3">
                                    {categories.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <div
                                                key={item.label}
                                                className="flex items-center gap-3"
                                            >
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50">
                                                    <Icon className="text-lg text-green-700" />
                                                </div>
                                                <div className="flex flex-1 items-center justify-between">
                                                    <span className="text-sm font-semibold text-gray-800">
                                                        {item.label}
                                                    </span>
                                                    <span className="text-sm font-medium text-green-700">
                                                        {item.value}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="rounded-xl bg-green-50 p-5 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                                            <FaLeaf className="text-lg text-green-700" />
                                        </div>

                                        <h3 className="text-lg font-semibold text-green-900">
                                            Did you know?
                                        </h3>
                                    </div>

                                    <p className="mt-4 text-sm leading-6 text-green-800">
                                        Choosing public transport, walking, or cycling instead of driving alone
                                        can help reduce carbon emissions and lower your personal carbon footprint.
                                    </p>
                                </div>
                            </div>


                        </CardFooter>
                    </Card>
                </div>

            </div>
        </div>
    )
}

export default ActivityForm