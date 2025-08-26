// src/app/about/page.tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Generate metadata for the page
export async function generateMetadata() {
  return {
    title: "About Us - RecipeShare",
    description: "Learn more about RecipeShare, our mission, and the team behind the platform.",
    openGraph: {
      title: "About Us - RecipeShare",
      description: "Learn more about RecipeShare, our mission, and the team behind the platform.",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "About RecipeShare",
        },
      ],
    },
  };
}

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <div className="relative h-96">
        <Image
          src={"http://localhost:8000/media/meals/Chicken_Karaage.jpg"}
          alt="About RecipeShare"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">About RecipeShare</h1>
            <p className="text-xl">
              Discover the story behind RecipeShare and the team that makes it all possible.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-8">
            At RecipeShare, our mission is to bring people together through the joy of cooking. We
            believe that sharing recipes and culinary experiences can create meaningful connections
            and inspire creativity in the kitchen.
          </p>
          <Button asChild>
            <Link href="/categories">Explore Recipes</Link>
          </Button>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="relative h-64 w-64 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/dp.jpeg"
                  alt="Team Member 1"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Mofor Sharon</h3>
              <p className="text-muted-foreground">Founder & CEO</p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
              <div className="relative h-64 w-64 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="IMG_2107.jpg" 
                  alt="Team Member 2"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Mofor Sharon</h3>
              <p className="text-muted-foreground">Lead Developer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join the RecipeShare Community</h2>
          <p className="text-lg text-white mb-8">
            Start sharing your favorite recipes and discover new ones today!
          </p>
          <Button asChild variant="secondary">
            <Link href="/categories">Get Started</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}