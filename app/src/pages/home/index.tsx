import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <div>
        <img src="./public/jinhsi.webp" alt="LOGO" className="m-8" />
      </div>
      <div>
        <h1
          className="text-4xl font-semibold"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
          }}
        >
          JinhsiStudio
        </h1>
      </div>
      <Separator className="mt-6 mb-10" />
      <div className="flex flex-row items-center mt-2">
        <img
          alt="license"
          src="https://img.shields.io/github/license/JinhsiStudio/JinhsiStudio"
          className="ml-1"
        />
        <img
          alt="commit"
          src="https://img.shields.io/github/commit-activity/m/JinhsiStudio/JinhsiStudio"
          className="ml-1"
        />
      </div>
      <div className="flex flex-row items-center mt-2">
        <img
          alt="stars"
          src="https://img.shields.io/github/stars/JinhsiStudio/JinhsiStudio?style=social"
          className="ml-1"
        />
        <img
          alt="GitHub all releases"
          src="https://img.shields.io/github/downloads/JinhsiStudio/JinhsiStudio/total?style=social"
          className="ml-1"
        />
      </div>
    </div>
  );
}
