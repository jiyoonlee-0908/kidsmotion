import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateKidsMotionImage(): Promise<{ url: string }> {
  const prompt = `A professional, high-quality photograph of a child using the KidsMotion fitness assessment system. The scene shows:

- A 8-10 year old Korean child sitting on a modern, adjustable indoor cycling machine designed specifically for children
- The bike has a sleek, medical-grade white and purple design with adjustable seat height, handlebar height, and positioning
- A large digital display screen showing real-time fitness metrics, colorful charts, and child-friendly interface
- The setting is a bright, clean, modern school gymnasium or fitness center with white walls and good lighting
- The child is wearing comfortable athletic wear and appears engaged and happy
- Professional medical/fitness equipment aesthetic similar to high-end rehabilitation or sports science facilities
- The bike frame is compact and child-sized, clearly designed for ages 4-12
- Visible adjustment mechanisms on the seat and handlebars showing the customizable nature
- Clean, professional product photography style suitable for investor presentations
- Bright, well-lit environment that conveys safety and professionalism

Style: Professional product photography, bright and clean, medical/fitness equipment aesthetic, suitable for business presentations, high resolution, realistic rendering`;

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    size: "1024x1024",
    quality: "hd",
  });

  return { url: response.data[0].url! };
}