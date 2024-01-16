import Header from "@/components/header";
import React from "react";
import { montserrat } from ".";
import Footer from "@/components/footer";
import Link from "next/link";
import Carousel from "@/components/carousel";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { BASE_URL, Product } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import FeaturedProducts from "@/components/featured-products";
import Image from "next/image";
import Fetching from "@/components/ui/fetching";
import Partners from "@/components/partners";

export default function ProductDetails() {
  const router = useRouter();
  const id = router.query.slug as string;

  const fetchProduct: () => Promise<Product> = async () => {
    const response = await axios.get(`${BASE_URL}/products/${id}`);

    return response.data;
  };

  const { isLoading, data, error } = useQuery([`product${id}`], () => fetchProduct());
  const axiosError = error as AxiosError;

  if (isLoading) return <Fetching />;

  if (axiosError)
    return (
      <div className="flex justify-center items-center">
        <p className="text-2xl font-medium">Error: {axiosError?.message}</p>
      </div>
    );

  return (
    <main className={`min-h-screen bg-[#FAFAFA] ${montserrat.className}`}>
      <Header />

      <section className="lg:px-20 2xl:px-[195px]">
        {/*** Breadcrumbs ***/}
        <div className="flex justify-center lg:justify-start items-center gap-[15px] py-[10px] my-6">
          <Link
            href="/"
            className="text-textColor text-sm font-bold transition-all hover:text-secondTextColor"
          >
            Home
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="16"
            viewBox="0 0 10 16"
            fill="none"
          >
            <g clipPath="url(#clip0_541_574)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.680771 0.180771C0.737928 0.123469 0.805828 0.0780066 0.880583 0.0469869C0.955337 0.0159672 1.03548 0 1.11641 0C1.19735 0 1.27749 0.0159672 1.35224 0.0469869C1.427 0.0780066 1.4949 0.123469 1.55205 0.180771L8.9358 7.56452C8.9931 7.62168 9.03857 7.68958 9.06959 7.76433C9.10061 7.83909 9.11657 7.91923 9.11657 8.00016C9.11657 8.0811 9.10061 8.16124 9.06959 8.23599C9.03857 8.31074 8.9931 8.37865 8.9358 8.4358L1.55205 15.8196C1.43651 15.9351 1.27981 16 1.11641 16C0.953015 16 0.79631 15.9351 0.680771 15.8196C0.565232 15.704 0.500322 15.5473 0.500322 15.3839C0.500322 15.2205 0.565232 15.0638 0.680771 14.9483L7.63011 8.00016L0.680771 1.05205C0.623469 0.994897 0.578006 0.926996 0.546986 0.852242C0.515967 0.777487 0.5 0.697347 0.5 0.616412C0.5 0.535478 0.515967 0.455338 0.546986 0.380583C0.578006 0.305829 0.623469 0.237928 0.680771 0.180771Z"
                fill="#BDBDBD"
              />
            </g>
            <defs>
              <clipPath id="clip0_541_574">
                <rect
                  width="9"
                  height="16"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
            </defs>
          </svg>
          <p className="text-sm text-secondTextColor font-bol">Shop</p>
        </div>

        <Carousel data={data!} />
      </section>

      {/*** Description ***/}
      <section className="lg:px-20 2xl:px-[195px] space-y-[17px] bg-white">
        <div>
          <div className="flex sm:gap-6 justify-center items-center">
            <button className="text-secondTextColor p-6 text-sm font-bold transition-all hover:text-textColor">
              Description
            </button>
            <button className="text-secondTextColor p-6 text-sm font-bold transition-all hover:text-textColor">
              Additional Information
            </button>
            <button className="flex items-center p-6 gap-[9px] text-secondTextColor transition-all hover:text-textColor text-sm font-bold">
              Reviews
              <span className="text-[#23856D]">(0)</span>
            </button>
          </div>
          <div className="bg-[#ECECEC] h-[1px]" />
        </div>

        <div className="py-6 px-10 sm:px-16 lg:px-0 flex flex-col sm:flex-row gap-[30px] justify-between">
          <div className="space-y-[30px] max-w-[600px]">
            <p className="text-2xl font-bold">{data?.title}</p>
            <p className="text-mutedColor text-sm">{data?.description}</p>
          </div>

          <Image
            src={data?.thumbnail ?? ""}
            alt="Product"
            width={413}
            height={0}
            className="object-cover flex-shrink-0 rounded-[6px] h-auto w-auto"
          />
        </div>
      </section>

      {/*** BestSeller ***/}
      <section className="lg:px-20 2xl:px-[195px] py-12 flex flex-col justify-center items-center lg:block">
        <div className="space-y-6">
          <p className="text-2xl font-bold">BESTSELLER PRODUCTS</p>
          <div className="w-full h-[2px] bg-[#ECECEC]" />
        </div>
        <FeaturedProducts />
        <Partners />
      </section>

      <Footer />
    </main>
  );
}
