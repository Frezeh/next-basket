import { ProductListType, cartTotal } from "@/lib/utils";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "@/redux/cart-slice";
import { RootState } from "@/redux/store";
import { Drawer, Rating } from "@mui/material";
import Image from "next/image";
import React, { RefObject, createRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { montserrat } from "@/pages";

export default function Cart({ iconSize }: { iconSize?: "sm" | "lg" }) {
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleDecrease = (product: ProductListType) => {
    if (product.quantity > 1) dispatch(decrementQuantity(product.id));
    else dispatch(removeItem(product.id));
  };

  return (
    <>
      <button
        className="p-[15px] flex gap-[5px] items-center transition-all hover:scale-[1.1] duration-[250ms] ease-out"
        onClick={toggleDrawer(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={iconSize === "sm" ? "16" : "37"}
          height={iconSize === "sm" ? "16" : "37"}
          viewBox="0 0 16 16"
          fill="none"
        >
          <g clipPath="url(#clip0_540_809)">
            <path
              d="M0.000305176 1.5C0.000305176 1.36739 0.0529836 1.24021 0.146752 1.14645C0.24052 1.05268 0.367697 1 0.500305 1H2.00031C2.11184 1.00003 2.22016 1.03735 2.30804 1.10602C2.39592 1.1747 2.45831 1.27078 2.48531 1.379L2.89031 3H14.5003C14.5737 3.00007 14.6462 3.0163 14.7127 3.04755C14.7791 3.0788 14.8378 3.12429 14.8847 3.1808C14.9316 3.23731 14.9654 3.30345 14.9838 3.37452C15.0023 3.44558 15.0048 3.51984 14.9913 3.592L13.4913 11.592C13.4699 11.7066 13.409 11.8101 13.3194 11.8846C13.2297 11.9591 13.1169 11.9999 13.0003 12H4.00031C3.88374 11.9999 3.77087 11.9591 3.68122 11.8846C3.59156 11.8101 3.53075 11.7066 3.50931 11.592L2.01031 3.607L1.61031 2H0.500305C0.367697 2 0.24052 1.94732 0.146752 1.85355C0.0529836 1.75979 0.000305176 1.63261 0.000305176 1.5ZM3.10231 4L4.41531 11H12.5853L13.8983 4H3.10231ZM5.00031 12C4.46987 12 3.96116 12.2107 3.58609 12.5858C3.21102 12.9609 3.00031 13.4696 3.00031 14C3.00031 14.5304 3.21102 15.0391 3.58609 15.4142C3.96116 15.7893 4.46987 16 5.00031 16C5.53074 16 6.03945 15.7893 6.41452 15.4142C6.78959 15.0391 7.00031 14.5304 7.00031 14C7.00031 13.4696 6.78959 12.9609 6.41452 12.5858C6.03945 12.2107 5.53074 12 5.00031 12ZM12.0003 12C11.4699 12 10.9612 12.2107 10.5861 12.5858C10.211 12.9609 10.0003 13.4696 10.0003 14C10.0003 14.5304 10.211 15.0391 10.5861 15.4142C10.9612 15.7893 11.4699 16 12.0003 16C12.5307 16 13.0394 15.7893 13.4145 15.4142C13.7896 15.0391 14.0003 14.5304 14.0003 14C14.0003 13.4696 13.7896 12.9609 13.4145 12.5858C13.0394 12.2107 12.5307 12 12.0003 12ZM5.00031 13C5.26552 13 5.51988 13.1054 5.70741 13.2929C5.89495 13.4804 6.00031 13.7348 6.00031 14C6.00031 14.2652 5.89495 14.5196 5.70741 14.7071C5.51988 14.8946 5.26552 15 5.00031 15C4.73509 15 4.48073 14.8946 4.2932 14.7071C4.10566 14.5196 4.00031 14.2652 4.00031 14C4.00031 13.7348 4.10566 13.4804 4.2932 13.2929C4.48073 13.1054 4.73509 13 5.00031 13ZM12.0003 13C12.2655 13 12.5199 13.1054 12.7074 13.2929C12.8949 13.4804 13.0003 13.7348 13.0003 14C13.0003 14.2652 12.8949 14.5196 12.7074 14.7071C12.5199 14.8946 12.2655 15 12.0003 15C11.7351 15 11.4807 14.8946 11.2932 14.7071C11.1057 14.5196 11.0003 14.2652 11.0003 14C11.0003 13.7348 11.1057 13.4804 11.2932 13.2929C11.4807 13.1054 11.7351 13 12.0003 13Z"
              fill="#23A6F0"
            />
          </g>
          <defs>
            <clipPath id="clip0_540_809">
              <rect
                width={iconSize === "sm" ? "16" : "37"}
                height={iconSize === "sm" ? "16" : "37"}
                fill="white"
                transform="translate(0.000305176)"
              />
            </clipPath>
          </defs>
        </svg>
        <p className="text-xs text-primaryColor">{cartTotal(cart).totalQuantity}</p>
      </button>

      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <div
          className={`flex flex-col gap-8 fixed w-[325px] max-h-[800px] rounded-lg overflow-y-scroll overflow-x-hidden px-4 py-8 right-[10%] top-[70px] bg-white ${montserrat.className}`}
        >
          <p className="text-base">
            <strong className="text-2xl">Cart</strong>,{" "}
            {cartTotal(cart).totalQuantity} items
          </p>

          <div className="flex flex-col gap-[30px]">
            {cart.map((product) => (
              <div
                key={product.id}
                className="flex flex-col justify-between mb-2.5"
              >
                <div className="hidden lg:block w-full h-px mx-0 my-5 bg-[#e5e5e5]" />
                <div>
                  <div className="lg:flex lg:flex-col">
                    <p className="text-xl">{product.title}</p>
                    <div className="pt-3 flex items-center gap-[10px] pb-5">
                      <Rating
                        name="read-only"
                        value={product.rating}
                        readOnly
                        sx={{
                          "& .MuiRating-icon": {
                            color: "#F3CD03",
                          },
                        }}
                      />
                      <p className="text-sm text-secondTextColor font-bold">
                        10 Reviews
                      </p>
                    </div>
                    <div className="space-y-[5px]">
                      <p className="text-2xl font-bold">${product.price}</p>
                      <p className="text-sm font-bold text-secondTextColor">
                        Availability :{" "}
                        <span className="text-primaryColor">
                          {product.stock} In Stock
                        </span>
                      </p>
                    </div>

                    <div className="mx-0 my-5">
                      <svg
                        width="150"
                        height="30"
                        viewBox="0 0 150 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="15" cy="15" r="15" fill="#23A6F0" />
                        <circle cx="55" cy="15" r="15" fill="#2DC071" />
                        <circle cx="95" cy="15" r="15" fill="#E77C40" />
                        <circle cx="135" cy="15" r="15" fill="#252B42" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex flex-row max-h-[250px] relative overflow-hidden w-full">
                    <section className="flex flex-col justify-between pr-[5px]">
                      <button
                        className="box-border border w-6 h-6 rounded-[5px] flex justify-center items-center border-solid border-[#1d1f22] hover:bg-[#1d1f22] group"
                        onClick={() => dispatch(incrementQuantity(product.id))}
                      >
                        <p className="text-center font-medium group-hover:text-white">
                          +
                        </p>
                      </button>
                      <h4 className="text-center font-medium text-base leading-[160%]">
                        {product.quantity}
                      </h4>
                      <button
                        className="box-border border w-6 h-6 rounded-[5px] flex justify-center items-center border-solid border-[#1d1f22] hover:bg-[#1d1f22] group"
                        onClick={() => handleDecrease(product)}
                      >
                        <p className="text-center font-medium group-hover:text-white">
                          -
                        </p>
                      </button>
                    </section>

                    <ImageCarousel images={product.images} />
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between">
              <p className="text-base">Total</p>
              <p className="text-xl font-bold">
                {cartTotal(cart).totalPrice.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
            </div>

            {cart.length > 0 && (
              <Button className=" w-[140px] h-[43px]" variant="secondary">
                CHECK OUT
              </Button>
            )}

            <div className="hidden lg:block w-full h-px mx-0 my-5 bg-[#e5e5e5]" />
          </div>
        </div>
      </Drawer>
    </>
  );
}

function ImageCarousel({ images }: { images: string[] }) {
  const [currentImage, setCurrentImage] = useState(0);

  const refs = images.reduce(
    (acc: Record<number, RefObject<HTMLDivElement>>, _, i) => {
      acc[i] = createRef();

      return acc;
    },
    {}
  );

  const scrollToImage = (i: number) => {
    setCurrentImage(i);

    refs[i]?.current!.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  const totalImages = images.length;

  const nextImage = () => {
    if (currentImage >= totalImages - 1) {
      scrollToImage(0);
    } else {
      scrollToImage(currentImage + 1);
    }
  };

  const previousImage = () => {
    if (currentImage === 0) {
      scrollToImage(totalImages - 1);
    } else {
      scrollToImage(currentImage - 1);
    }
  };

  return (
    <div className="carousel">
      {images.map((d, i) => (
        <div className="flex-shrink-0" key={i} ref={refs[i]}>
          <div className="w-[265px] h-auto relative overflow-hidden">
            <div className="relative inset-0 w-[265px] h-[265px] object-cover">
              <Image
                src={d}
                alt="item"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <>
              <button
                onClick={nextImage}
                className="flex justify-center items-center w-6 h-6 absolute cursor-pointer right-[30px] bottom-5 bg-[rgba(0,0,0,0.4)]"
              >
                <svg
                  width="8"
                  height="14"
                  viewBox="0 0 8 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.75 1.06808L6.375 6.68711L0.75 12.3062"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={previousImage}
                className="flex justify-center items-center w-6 h-6 absolute cursor-pointer right-[80px] bottom-5  bg-[rgba(0,0,0,0.4)]"
              >
                <svg
                  width="8"
                  height="14"
                  viewBox="0 0 8 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.25 1.06857L1.625 6.6876L7.25 12.3066"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          </div>
        </div>
      ))}
    </div>
  );
}
