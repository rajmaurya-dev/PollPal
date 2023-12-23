import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];

const genAI = new GoogleGenerativeAI(process.env.API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { topic } = await req.json();
    const parts = [
      { text: "topic: Smartphone" },
      { text: "poll title: Which Brand's smartphone you prefer?" },
      { text: "poll option 1: Samsung" },
      { text: "poll option 2: iPhone" },
      { text: "topic: favorite cricketer" },
      { text: "poll title: Who is your Favorite cricketer" },
      { text: "poll option 1: Virat Kohli" },
      { text: "poll option 2: MS Dhoni" },
      { text: "topic: favorite movie" },
      { text: "poll title: What is your favorite movie?" },
      { text: "poll option 1: Avengers Endgame" },
      { text: "poll option 2: Inception" },
      { text: "topic: favorite food" },
      { text: "poll title: What is your favorite food?" },
      { text: "poll option 1: Pizza" },
      { text: "poll option 2: Pasta" },
      { text: "topic: favorite book" },
      { text: "poll title: What is your favorite book?" },
      { text: "poll option 1: Harry Potter" },
      { text: "poll option 2: Lord of the Rings" },
      { text: "topic: favorite travel destination" },
      { text: "poll title: What is your dream travel destination?" },
      { text: "poll option 1: Paris" },
      { text: "poll option 2: Bali" },
      { text: "topic: favorite music genre" },
      { text: "poll title: What is your favorite music genre?" },
      { text: "poll option 1: Rock" },
      { text: "poll option 2: Pop" },
      { text: "topic: favorite streaming service" },
      { text: "poll title: What's your favorite streaming service?" },
      { text: "poll option 1: Netflix" },
      { text: "poll option 2: Hulu" },
      { text: "topic: favorite pet" },
      { text: "poll title: What's your favorite pet animal?" },
      { text: "poll option 1: Dog" },
      { text: "poll option 2: Cat" },
      { text: "topic: favorite season" },
      { text: "poll title: What's your favorite season?" },
      { text: "poll option 1: Summer" },
      { text: "poll option 2: Winter" },
      { text: "topic: morning person or night owl" },
      { text: "poll title: Are you a morning person or a night owl?" },
      { text: "poll option 1: Morning person" },
      { text: "poll option 2: Night owl" },
      { text: "topic: tea or coffee" },
      { text: "poll title: Do you prefer tea or coffee?" },
      { text: "poll option 1: Tea" },
      { text: "poll option 2: Coffee" },
      { text: "topic: beach or mountains" },
      { text: "poll title: Do you prefer the beach or the mountains?" },
      { text: "poll option 1: Beach" },
      { text: "poll option 2: Mountains" },
      { text: "topic: dogs or cats" },
      { text: "poll title: Do you prefer dogs or cats?" },
      { text: "poll option 1: Dogs" },
      { text: "poll option 2: Cats" },
      { text: "topic: superhero or villain" },
      { text: "poll title: Do you prefer superheroes or villains?" },
      { text: "poll option 1: Superhero" },
      { text: "poll option 2: Villain" },
      { text: "topic: comedy or drama" },
      { text: "poll title: Do you prefer comedy or drama movies/shows?" },
      { text: "poll option 1: Comedy" },
      { text: "poll option 2: Drama" },
      { text: "topic: salty or sweet" },
      { text: "poll title: Do you prefer salty or sweet snacks?" },
      { text: "poll option 1: Salty" },
      { text: "poll option 2: Sweet" },
      { text: "topic: early bird or night owl" },
      { text: "poll title: Are you an early bird or a night owl?" },
      { text: "poll option 1: Early bird" },
      { text: "poll option 2: Night owl" },
      { text: "topic: Marvel or DC" },
      { text: "poll title: Do you prefer Marvel or DC comics/movies?" },
      { text: "poll option 1: Marvel" },
      { text: "poll option 2: DC" },
      { text: `topic: ${topic}` },
      { text: "poll title:  " },
    ];
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });
    const response = result.response;
    const aiResponse = response.text();
    console.log(response.text());
    return NextResponse.json({ aiResponse }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
