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
        <Container classNames='py-2'>
            <main className='flex flex-col md:flex-row justify-center flex-wrap gap-5 py-4 '>
                <Card className='bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg py-2 md:w-[40%] p-1'>
                    <CardContent className='text-gray-600 p-1'>
                        Get reactions fast. Create a poll in 30 seconds or less.
                    </CardContent>
                </Card>
                <Card className='bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg py-2 md:w-[40%] p-1'>
                    <CardContent className='text-gray-600 p-1'>
                        Start analyzing results as votes roll in.
                    </CardContent>
                </Card>
                <Card className='bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg py-2 md:w-[40%] p-1'>
                    <CardContent className='text-gray-600 text-center p-1'>
                        Turn feedback into action. Identify trends, ideas, and opportunities revealed by your audience.
                    </CardContent>
                </Card>

            </main>
        </Container>
    )
}

export default Features