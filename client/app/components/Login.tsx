"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast, { Toaster } from 'react-hot-toast';
import * as z from "zod"
import axios from "axios"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useUserStore } from "@/utils/features";
import { redirect } from "next/navigation";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(5, {
        message: "Password must be at least 5 characters.",
    }),
})
function handleSubmit() {

}
async function onSubmit(values: z.infer<typeof formSchema>) {

    const { setUser, user } = useUserStore.getState()

    try {
        const { username, password } = values
        console.log(username, password);
        console.log(process.env.NEXT_PUBLIC_SERVER_PATH)
        const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_PATH}/auth/login`,
            { username, password },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );
        setUser(data)

        toast.success(data?.message || 'Success');


    } catch (error: any) {
        toast.error('Invalid Credentials');


    }
};


export function Login() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    const { setUser, user } = useUserStore.getState()
    if (user.id) return redirect("/dashboard");

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <CardContent className="space-y-2">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="pollking" {...field} />
                                    </FormControl>
                                    <FormDescription>

                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="enter your password" {...field} />
                                    </FormControl>
                                    <FormDescription>

                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">Login</Button>

                    </CardFooter>
                </form>
            </Form >
            <Toaster />
        </>
    )
}
