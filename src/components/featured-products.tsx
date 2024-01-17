import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { BASE_URL, Product, Response } from "@/lib/utils";
import Fetching from "./ui/fetching";
import { CircularProgress } from "@mui/material";

export default function FeaturedProducts({
  paginated,
}: {
  paginated?: boolean;
}) {
  const fetchProducts: (limit: number) => Promise<Response> = async (
    limit: number
  ) => {
    const response = await axios.get(`${BASE_URL}/products`, {
      params: { limit },
    });

    const data = {
      ...response.data,
      next: response.data.total > response.data.limit ? limit + 10 : undefined,
    };

    return data;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    ["products"],
    ({ pageParam }) => fetchProducts(pageParam || 10),
    {
      getNextPageParam: (lastPage) => lastPage.next,
    }
  );

  const axiosError = error as AxiosError;

  if (status === "loading") return <Fetching />;

  if (status === "error")
    return (
      <div className="flex justify-center items-center">
        <p className="text-2xl font-medium">Error: {axiosError?.message}</p>
      </div>
    );

  const products = data?.pages[data.pages.length - 1].products;

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[30px] py-6 my-6">
        {products &&
          products.map((product: Product) => (
            <Link
              className="max-w-[239px]"
              href={`/${product.id}`}
              key={product.id}
            >
              <div className="relative inset-0 w-[239px] h-[238px] object-cover">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  className="object-contain"
                />
              </div>
              <div className="px-[25px] pb-[35px] pt-[25px] flex flex-col items-center gap-[10px] bg-white">
                <p className="text-base text-center font-bold">
                  {product.title}
                </p>
                <p className="text-sm text-secondTextColor text-center font-bold">
                  {product.description}
                </p>
                <p className="text-base text-mutedColor text-center font-bold">
                  ${product.price}{" "}
                  <span className="text-[#23856D]">
                    $
                    {Number(
                      product.price * (1 - product.discountPercentage / 100)
                    ).toFixed(2)}
                  </span>
                </p>
              </div>
            </Link>
          ))}
      </div>

      {paginated && hasNextPage && (
        <Button
          className="w-[261px] h-[52px] self-center"
          variant="secondary"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? (
            <CircularProgress color="inherit" />
          ) : (
            "LOAD MORE PRODUCTS"
          )}
        </Button>
      )}
    </>
  );
}
