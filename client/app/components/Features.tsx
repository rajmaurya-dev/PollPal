import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Container from '@/components/ui/Container'
const Features = () => {
    return (
        <Container classNames='pt-5'>
            <main className='flex flex-col md:flex-row justify-center flex-wrap gap-5 py-4'>
                <Card className='bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg py-2 md:w-[40%]'>
                    <CardContent className='text-gray-600'>
                        Get reactions in real-time. Our simple interface allows you to create customized polls in under 30 seconds. As soon as your poll is live, you'll start seeing results roll in. No more waiting around - get instant access to insights
                    </CardContent>
                </Card>
                <Card className='bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg py-2 md:w-[40%]'>
                    <CardContent className='text-gray-600'>
                        Reach a wider audience easily. Our polls are fun and engaging by design. Share poll links via email, social, chat or embed them directly into webpages and apps. The more voices the better - we make participation effortless.
                    </CardContent>
                </Card>
                <Card className='bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg py-2 md:w-[40%]'>
                    <CardContent className='text-gray-600'>
                        Take feedback and turn it into action. Our detailed analytics tools allow you to slice and dice response data, identifying key trends, themes, and ideas. Uncover hidden opportunities and new directions revealed by your audience.
                    </CardContent>
                </Card>

            </main>
        </Container>
    )
}

export default Features