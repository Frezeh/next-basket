import AboutUs from "@/components/about-us";
import BestService from "@/components/best-service";
import FeaturedPost from "@/components/featured-post";
import FeaturedProducts from "@/components/featured-products";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import { Button } from "@/components/ui/button";
import { Montserrat } from "next/font/google";

export const montserrat = Montserrat({
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className={`min-h-screen bg-white ${montserrat.className}`}>
      <Header />
      <Hero />
      {/*** Featured Products ***/}
      <section className="flex flex-col justify-center items-center py-20 lg:px-20 2xl:px-[195px]">
        <div className="space-y-[10px] max-w-[260px] sm:max-w-full">
          <p className="text-xl text-secondTextColor text-center">
            Featured Products
          </p>
          <p className="text-2xl font-bold text-center">BESTSELLER PRODUCTS</p>
          <p className="text-sm text-secondTextColor text-center">
            Problems trying to resolve the conflict between
          </p>
        </div>
        <FeaturedProducts paginated/>
      </section>

      <BestService />
      <FeaturedPost />
      <AboutUs />

      {/*** Call to Action ***/}
      <section className="relative w-full h-[712px] sm:h-[640px] bg-[url('/assets/images/footer-bg.png')] bg-cover bg-no-repeat">
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-[571px] w-full">
          <div className="space-y-[30px] text-center">
            <p className="text-sm text-primaryColor font-bold">
              Designing Better Experience
            </p>
            <p className="text-[40px] font-bold leading-[50px]">
              Problems trying to resolve the conflict between
            </p>
            <p className="text-sm text-secondTextColor max-w-[477px] mx-auto">
              Problems trying to resolve the conflict between the two major
              realms of Classical physics:
            </p>
            <p className="text-2xl text-[#23856D] font-bold">$16.48</p>
            <Button size="lg">ADD YOUR CALL TO ACTION</Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
