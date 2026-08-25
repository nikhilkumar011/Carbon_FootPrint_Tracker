"use client";
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/auth-client';
import { useAuthStore } from '@/stores/useAuthStore';
import { Leaf, Sun, TreePine } from 'lucide-react'
import Link from 'next/link'


import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc'


const Signup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cnf, setCnf] = useState("");


    const { signup } = useAuthStore();

    const handleSubmit = async () => {
        if (password !== cnf) {
            toast.error("Passwords Don't match")
            return;
        }
        signup({ email, password, name });
    }
    const googleSignIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
    callbackURL: "/dashboard",
  });

  
};

    return (
        <div className='flex md:flex-row flex-col justify-between items-center my-auto shadow-2xl'>
            {/* left */}
            <div className='border h-screen w-full  bg-green-900 text-white hidden md:flex items-center flex-col justify-center'>
                <section className="text-gray-400 body-font">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-col text-center w-full mb-12">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-100">Carbon Footprint Tracker</h1>
                            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Track, understand, and reduce your environmental impact with a simple carbon footprint tracker. Monitor emissions from travel, energy, food, and everyday activities, set reduction goals, and discover practical ways to live more sustainably</p>
                        </div>

                        <div className='flex justify-center items-center gap-3 text-2xl font-bold text-white'>
                            <div>
                                <TreePine />
                            </div>
                            <div>
                                <Sun />
                            </div>
                            <div>
                                <Leaf />
                            </div>
                        </div>

                    </div>
                </section>
            </div>
            {/* right */}
            <div className='container m-auto flex items-center justify-center'>
                <div className='border h-full w-full md:h-130 md:w-100  justify-center p-3'>
                    <h1 className='text-2xl text-gray-800 p-3'>Signup</h1>
                    <div className='flex flex-col gap-2 py-3'>
                        <div>
                            <p className='text-gray-600 '>Username</p>
                            <Input className='text-sm' onChange={(e) => setName(e.target.value)} placeholder='alice...' />
                        </div>
                        <div>
                            <p className='text-gray-600 '>Email</p>
                            <Input type='email' className='text-sm' onChange={(e) => setEmail(e.target.value)} placeholder='johndoe@example.com' />
                        </div>
                        <div>
                            <p className='text-gray-600 '>Password</p>
                            <Input type={isVisible ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} className='text-sm' placeholder='password' />
                        </div>
                        <div>
                            <p className='text-gray-600 '>Confirm Password</p>
                            <Input onChange={(e) => setCnf(e.target.value)} type={isVisible ? "text" : "password"} className='text-sm' placeholder='confirm password' />
                        </div>
                    </div>
                    <div className='py-1 flex gap-2 items-center'>
                        <Checkbox onCheckedChange={() => setIsVisible((prev) => !prev)} />
                        <p className='text-sm text-gray-400'>Show Password</p>
                    </div>

                    <div className='flex flex-col gap-2 py-2'>
                        <Button onClick={handleSubmit} className='w-full cursor-pointer'>
                            Signup</Button>
                        <Button onClick={googleSignIn} variant={"secondary"} className='w-full cursor-pointer'><FcGoogle />Continue With Google</Button>
                    </div>

                    <div className='p-3 flex justify-center text-gray-700'>
                        <p>Already Have an account ? <Link className='text-blue-950' href={'/login'}>Login</Link></p>
                    </div>







                </div>
            </div>

        </div>
    )
}

export default Signup