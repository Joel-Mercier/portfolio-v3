import { Prompt } from "@next/font/google";

export const prompt = Prompt({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-prompt",
});
