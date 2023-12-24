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
      { text: "topic: ideal vacation destination" },
      {
        text: "poll title: If you could go anywhere, what would be your ideal vacation destination?",
      },
      { text: "poll option 1: Relaxing beach getaway" },
      { text: "poll option 2: Big city with lots to explore" },

      { text: "topic: favorite cuisine" },
      { text: "poll title: What type of cuisine is your favorite to eat?" },
      { text: "poll option 1: Italian - pizza, pasta, etc." },
      { text: "poll option 2: Indian - curries, naan, etc." },

      { text: "topic: perfect weather" },
      { text: "poll title: What is your ideal perfect weather?" },
      { text: "poll option 1: Warm and sunny" },
      { text: "poll option 2: Cool and cloudy" },

      { text: "topic: best superpower" },
      {
        text: "poll title: If you could have any superpower, which would you choose?",
      },
      { text: "poll option 1: Ability to fly" },
      { text: "poll option 2: Ability to become invisible" },

      { text: "topic: ideal pet" },
      {
        text: "poll title: If you could have any animal as a pet, what would you choose?",
      },
      { text: "poll option 1: Exotic pet like a parrot or snake" },
      { text: "poll option 2: Traditional pet like a dog or cat" },

      { text: "topic: best movie genre" },
      {
        text: "poll title: What genre of movies do you like watching the most?",
      },
      { text: "poll option 1: Thought-provoking dramas" },
      { text: "poll option 2: Funny lighthearted comedies" },

      { text: "topic: favorite book genre" },
      { text: "poll title: Do you prefer fiction books or nonfiction books?" },
      { text: "poll option 1: Nonfiction like self-help and history" },
      { text: "poll option 2: Fiction like fantasy, sci-fi and romance" },

      { text: "topic: ideal exercise routine" },
      { text: "poll title: What is your ideal exercise routine?" },
      { text: "poll option 1: Classes at the gym like yoga, spin, etc." },
      {
        text: "poll option 2: Outdoor activities like running, hiking, cycling",
      },
      { text: "topic: iOS or Android" },
      {
        text: "poll title: Do you prefer Apple iOS or Google Android for your smartphone?",
      },
      { text: "poll option 1: iOS - iPhones are simple and seamless" },
      { text: "poll option 2: Android - More customization and options" },

      { text: "topic: electric or gas car" },
      {
        text: "poll title: Would you rather own an electric car or a gas-powered car?",
      },
      { text: "poll option 1: Electric - Better for the environment" },
      { text: "poll option 2: Gas - Longer range and more convenient" },

      { text: "topic: Mars or moon colonization" },
      {
        text: "poll title: Which would you rather colonize first - Mars or the moon?",
      },
      { text: "poll option 1: Mars - More potential for life support" },
      { text: "poll option 2: Moon - Closer and easier to supply" },

      { text: "topic: PC or console gaming" },
      { text: "poll title: Do you prefer PC or console for gaming?" },
      { text: "poll option 1: PC - More customizable and upgradable" },
      { text: "poll option 2: Console - Simpler plug-and-play experience" },

      { text: "topic: astronomy or microbiology" },
      {
        text: "poll title: Are you more fascinated by astronomy or microbiology?",
      },
      { text: "poll option 1: Astronomy - the vastness of space" },
      { text: "poll option 2: Microbiology - the unseen world of germs" },

      { text: "topic: AI or human intelligence" },
      {
        text: "poll title: Do you think artificial or human intelligence is more important for the future?",
      },
      { text: "poll option 1: AI - faster processing and analysis" },
      { text: "poll option 2: Human intelligence - creativity and empathy" },

      { text: "topic: rockets or robots" },
      {
        text: "poll title: Which fascinates you more - space rockets or robots?",
      },
      { text: "poll option 1: Rockets - pioneering space exploration" },
      { text: "poll option 2: Robots - mimicking and assisting humans" },
      { text: "topic: ethics vs law" },
      {
        text: "poll title: Which do you think is more important - ethics or law?",
      },
      { text: "poll option 1: Ethics - moral principles are above laws" },
      { text: "poll option 2: Law - rules maintain order in society" },

      { text: "topic: greater good vs individual rights" },
      {
        text: "poll title: Which is more important to you - the greater good or individual rights?",
      },
      { text: "poll option 1: Greater good - benefits for society overall" },
      {
        text: "poll option 2: Individual rights - personal liberties protected",
      },

      { text: "topic: loyalty or honesty" },
      {
        text: "poll title: Which trait is more important in a relationship - loyalty or honesty?",
      },
      { text: "poll option 1: Loyalty - standing by loved ones" },
      { text: "poll option 2: Honesty - telling the truth even if difficult" },

      { text: "topic: rehabilitation or retribution" },
      {
        text: "poll title: Which criminal justice goal is more important - rehabilitation or retribution?",
      },
      {
        text: "poll option 1: Rehabilitation - reforming offenders to reduce recidivism",
      },
      {
        text: "poll option 2: Retribution - harsh punishments as consequences for crimes",
      },

      { text: "topic: act or intentions" },
      {
        text: "poll title: In judging morality, what matters more - actions or intentions?",
      },
      { text: "poll option 1: Actions - the actual consequences" },
      { text: "poll option 2: Intentions - the motivations behind actions" },

      { text: "topic: justice or mercy" },
      {
        text: "poll title: In making moral decisions, which virtue is more important - justice or mercy?",
      },
      { text: "poll option 1: Justice - holding wrongdoers accountable" },
      { text: "poll option 2: Mercy - compassion and forgiveness" },

      { text: "topic: free will or determinism" },
      {
        text: "poll title: Which view do you believe - free will or determinism?",
      },
      { text: "poll option 1: Free will - we make our own choices" },
      { text: "poll option 2: Determinism - our actions are pre-determined" },

      { text: "topic: rationalism or empiricism" },
      {
        text: "poll title: Which theory of knowledge do you favor - rationalism or empiricism?",
      },
      {
        text: "poll option 1: Rationalism - reason is the source of knowledge",
      },
      {
        text: "poll option 2: Empiricism - experience is the source of knowledge",
      },

      { text: "topic: skepticism or belief" },
      { text: "poll title: Are you more of a skeptic or a believer at heart?" },
      { text: "poll option 1: Skeptic - questioning and doubting claims" },
      { text: "poll option 2: Believer - accepting claims provisionally" },

      { text: "topic: facts or values" },
      {
        text: "poll title: Which is more important - objective facts or subjective values?",
      },
      { text: "poll option 1: Facts - verifiable by evidence" },
      { text: "poll option 2: Values - matters of preference and morality" },

      { text: "topic: altruism or egoism" },
      { text: "poll title: Is ethics better explained by altruism or egoism?" },
      { text: "poll option 1: Altruism - concern for others' well-being" },
      { text: "poll option 2: Egoism - self-interest and personal gain" },

      { text: "topic: universals or particulars " },
      { text: "poll title: Are universals or particulars more fundamental?" },
      { text: "poll option 1: Universals - abstract concepts and types" },
      { text: "poll option 2: Particulars - concrete individual objects" },
      { text: "topic: nature or nurture" },
      {
        text: "poll title: Which influences human behavior more - nature or nurture?",
      },
      { text: "poll option 1: Nature - genetic and biological factors" },
      { text: "poll option 2: Nurture - environmental influences" },

      { text: "topic: conscious or unconscious mind" },
      {
        text: "poll title: Which part of the mind influences behavior more - conscious or unconscious?",
      },
      { text: "poll option 1: Conscious - intentional thoughts and reasoning" },
      { text: "poll option 2: Unconscious - underlying drives and desires" },

      { text: "topic: emotions or logic" },
      {
        text: "poll title: Which guides your decisions more - emotions or logic?",
      },
      { text: "poll option 1: Emotions - gut reactions and feelings" },
      { text: "poll option 2: Logic - reasoned analysis" },

      { text: "topic: Myers-Briggs or Big Five" },
      {
        text: "poll title: Which personality model do you prefer - Myers-Briggs or Big Five?",
      },
      {
        text: "poll option 1: Myers-Briggs - 4 dimensions like introvert/extrovert",
      },
      { text: "poll option 2: Big Five - 5 broad trait spectrums" },

      { text: "topic: psychotherapy or medication" },
      {
        text: "poll title: Which treatment approach do you prefer for mental health - psychotherapy or medication?",
      },
      { text: "poll option 1: Psychotherapy - counseling and therapy" },
      { text: "poll option 2: Medication - prescription drugs" },

      { text: "topic: classical or operant conditioning" },
      {
        text: "poll title: Which process better explains learning - classical or operant conditioning?",
      },
      { text: "poll option 1: Classical conditioning - involuntary reflexes" },
      { text: "poll option 2: Operant conditioning - voluntary behaviors" },
      { text: "topic: romantic love or platonic love" },
      {
        text: "poll title: Which is more important to you - romantic love or friend/family love?",
      },
      { text: "poll option 1: Romantic love - passionate partnership" },
      { text: "poll option 2: Platonic love - caring non-sexual bonds" },

      { text: "topic: physical intimacy or emotional intimacy" },
      {
        text: "poll title: In a relationship, which intimacy matters more - physical or emotional?",
      },
      { text: "poll option 1: Physical intimacy - sexuality and touch" },
      { text: "poll option 2: Emotional intimacy - understanding and trust" },

      { text: "topic: long-term relationship or casual dating" },
      {
        text: "poll title: Do you prefer long-term relationships or casual dating?",
      },
      {
        text: "poll option 1: Long-term relationship - commitment and stability",
      },
      { text: "poll option 2: Casual dating - playing the field and freedom" },

      { text: "topic: unconditional or conditional love" },
      {
        text: "poll title: Which view of love do you believe in more - unconditional or conditional?",
      },
      {
        text: "poll option 1: Unconditional love - loving someone no matter what",
      },
      {
        text: "poll option 2: Conditional love - love depending on someone's actions",
      },

      { text: "topic: Maslow's hierarchy: love or esteem" },
      {
        text: "poll title: In Maslow's hierarchy, which is more important - love needs or esteem needs?",
      },
      { text: "poll option 1: Love needs - intimate relationships" },
      { text: "poll option 2: Esteem needs - prestige and accomplishment" },

      { text: "topic: sex or food and sleep" },
      {
        text: "poll title: What's more important - sex or essentials like food and sleep?",
      },
      { text: "poll option 1: Sex - important for intimacy and bonding" },
      { text: "poll option 2: Food and sleep - critical survival needs" },

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
