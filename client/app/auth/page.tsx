'use client'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useForm, SubmitHandler } from "react-hook-form"
import { Signup } from "../components/Signup"
import { Login } from "../components/Login"

interface IFormInput {
    username: string
    password: string
}
export default function TabsDemo() {
    const { register, handleSubmit } = useForm<IFormInput>()
    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)
    return (
        <div className="flex justify-center items-center ">

            <Tabs defaultValue="Login" className="w-[400px] bg-white bg-opacity-60 backdrop-blur-lg rounded drop-shadow-lg">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="Login">Login</TabsTrigger>
                    <TabsTrigger value="SignUp">SignUp</TabsTrigger>
                </TabsList>
                <TabsContent value="Login">
                    <Card className="bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg">
                        <CardHeader>
                            <CardTitle>Login</CardTitle>

                        </CardHeader>
                        <Login />
                    </Card>
                </TabsContent>
                <TabsContent value="SignUp">
                    <Card className="bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg">
                        <CardHeader>
                            <CardTitle>SignUp</CardTitle>

                        </CardHeader>

                        <Signup />

                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
