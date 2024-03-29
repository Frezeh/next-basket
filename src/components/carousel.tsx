import { Product } from "@/lib/utils";
import { Rating, Snackbar, Tooltip } from "@mui/material";
import Image from "next/image";
import React, { RefObject, SyntheticEvent, createRef, useState } from "react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cart-slice";
import { addToWishlist } from "@/redux/wishlist-slice";

export default function Carousel({ data }: { data: Product }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [openCartSnackbar, setOpenCartSnackbar] = React.useState(false);
  const [openWishlistSnackbar, setOpenWishlistSnackbar] = React.useState(false);
  const dispatch = useDispatch();

  const refs = data.images.reduce(
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

  const totalImages = data.images.length;

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

  const handleCloseCart = (_?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenCartSnackbar(false);
  };

  const handleCloseWishlist = (_?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenWishlistSnackbar(false);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row justify-center items-center lg:justify-start lg:items-start px-7 lg:px-0 gap-[30px] pb-12">
      <div className="space-y-5">
        <div className="w-[348px] sm:w-[506px] sm:h-[450px] overflow-hidden">
          <div className="w-full">
            <div className="carousel">
              {data.images.map((d, i) => (
                <div className="flex-shrink-0" key={i} ref={refs[i]}>
                  <div className="w-[348px] sm:w-[506px] sm:h-[450px] relative overflow-hidden">
                    <div className="relative inset-0 w-[348px] sm:w-[506px] h-[450px] object-cover">
                      <Image
                        src={d}
                        alt="item"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain"
                        priority
                      />
                    </div>
                    <button
                      aria-label="previous"
                      aria-labelledby="previous"
                      role="button"
                      onClick={previousImage}
                      className="absolute top-[40%] left-0 ml-10 w-10 h-14 flex justify-center items-center bg-[rgba(0,0,0,0.1)]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="45"
                        viewBox="0 0 24 45"
                        fill="none"
                        className={`${
                          currentImage === 0
                            ? "text-[#797979]"
                            : "text-[#F5F5F5]"
                        }`}
                      >
                        <g clipPath="url(#clip0_541_596)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M23.4992 44.3019C23.3409 44.4597 23.1528 44.585 22.9457 44.6704C22.7386 44.7558 22.5166 44.7998 22.2924 44.7998C22.0682 44.7998 21.8462 44.7558 21.6391 44.6704C21.432 44.5849 21.2439 44.4597 21.0856 44.3019L0.631046 23.9647C0.472307 23.8073 0.346367 23.6203 0.260435 23.4144C0.174505 23.2085 0.130272 22.9878 0.130272 22.7649C0.130272 22.5419 0.174505 22.3212 0.260435 22.1153C0.346367 21.9094 0.472307 21.7224 0.631046 21.565L21.0856 1.2278C21.4057 0.909569 21.8398 0.730789 22.2924 0.730789C22.7451 0.730789 23.1792 0.909569 23.4992 1.2278C23.8193 1.54603 23.9991 1.97765 23.9991 2.42769C23.9991 2.87774 23.8193 3.30935 23.4992 3.62759L4.24809 22.7649L23.4992 41.9021C23.658 42.0595 23.7839 42.2466 23.8698 42.4525C23.9558 42.6584 24 42.8791 24 43.102C24 43.3249 23.9558 43.5457 23.8698 43.7516C23.7839 43.9575 23.658 44.1445 23.4992 44.3019Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_541_596">
                            <rect
                              width="24"
                              height="44.4706"
                              fill="white"
                              transform="translate(24 45) rotate(-180)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                    <button
                      aria-label="next"
                      aria-labelledby="next"
                      role="button"
                      onClick={nextImage}
                      className="absolute top-[40%] right-0 mr-10 w-10 h-14 flex justify-center items-center bg-[rgba(0,0,0,0.1)]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="45"
                        viewBox="0 0 24 45"
                        fill="none"
                        className={`${
                          currentImage >= totalImages - 1
                            ? "text-[#797979]"
                            : "text-[#F5F5F5]"
                        }`}
                      >
                        <g clipPath="url(#clip0_541_593)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.565959 0.698096C0.724296 0.540269 0.912395 0.41505 1.11948 0.329612C1.32657 0.244174 1.54857 0.200195 1.77278 0.200195C1.99698 0.200195 2.21899 0.244174 2.42607 0.329612C2.63316 0.41505 2.82126 0.540269 2.9796 0.698096L23.4341 21.0353C23.5929 21.1927 23.7188 21.3797 23.8048 21.5856C23.8907 21.7915 23.9349 22.0122 23.9349 22.2351C23.9349 22.4581 23.8907 22.6788 23.8048 22.8847C23.7188 23.0906 23.5929 23.2776 23.4341 23.435L2.9796 43.7722C2.65953 44.0904 2.22542 44.2692 1.77278 44.2692C1.32013 44.2692 0.886027 44.0904 0.565959 43.7722C0.245891 43.454 0.066078 43.0224 0.066078 42.5723C0.066078 42.1223 0.245891 41.6906 0.565959 41.3724L19.8171 22.2351L0.565959 3.09788C0.407221 2.94045 0.281279 2.75343 0.195347 2.54754C0.109416 2.34164 0.0651855 2.12091 0.0651855 1.89799C0.0651855 1.67507 0.109416 1.45434 0.195347 1.24844C0.281279 1.04254 0.407221 0.855525 0.565959 0.698096Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_541_593">
                            <rect width="24" height="44.4706" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-5 justify-between">
          {data.images.map((d, i) => (
            <button onClick={() => scrollToImage(i)} key={i}>
              <Image
                src={d}
                alt="Blog"
                width={100}
                height={75}
                className="object-contain w-auto h-auto"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:justify-between sm:h-[450px] sm:w-[510px] pl-[25px] pr-10">
        <div>
          <p className="text-xl">{data.title}</p>
          <div className="pt-3 flex items-center gap-[10px] pb-5">
            <Rating
              name="read-only"
              value={data.rating}
              readOnly
              sx={{
                "& .MuiRating-icon": {
                  color: "#F3CD03",
                },
              }}
            />
            <p className="text-sm text-secondTextColor font-bold">10 Reviews</p>
          </div>
          <div className="space-y-[5px]">
            <p className="text-2xl font-bold">${data.price}</p>
            <p className="text-sm font-bold text-secondTextColor">
              Availability :{" "}
              <span className="text-primaryColor">{data.stock} In Stock</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <p className="lg:hidden text-sm text-[#858585] pt-8 pb-4">
            {data.description}
          </p>
          <div className="space-y-[30px]">
            <div className="bg-[#BDBDBD] h-[1px] w-full" />
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

          <div className="flex gap-[10px] pt-16">
            <Button variant="primary" className="w-[148px] h-11">
              Select Options
            </Button>
            <Tooltip title="Add to wishlist">
              <button
                className="flex w-10 h-10 justify-center items-center border p-2.5 rounded-full border-solid border-[#E8E8E8] bg-white transition-all hover:scale-[1.1] duration-[250ms] ease-out"
                onClick={() => {
                  dispatch(addToWishlist(data));
                  setOpenWishlistSnackbar(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-heart"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </button>
            </Tooltip>
            <Tooltip title="Add to cart">
              <button
                onClick={() => {
                  dispatch(addToCart({ ...data, quantity: 0 }));
                  setOpenCartSnackbar(true);
                }}
                className="flex w-10 h-10 justify-center items-center border p-2.5 rounded-full border-solid border-[#E8E8E8] bg-white transition-all hover:scale-[1.1] duration-[250ms] ease-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M0 1.63333C0 1.46536 0.0667281 1.30427 0.185505 1.1855C0.304281 1.06673 0.465377 1 0.633353 1H2.53341C2.67469 1.00004 2.8119 1.04731 2.92322 1.1343C3.03454 1.22129 3.11357 1.34299 3.14776 1.48007L3.66078 3.53333H18.3672C18.4602 3.53342 18.5521 3.55398 18.6362 3.59356C18.7204 3.63315 18.7948 3.69077 18.8541 3.76235C18.9135 3.83393 18.9564 3.9177 18.9797 4.00772C19.0031 4.09774 19.0063 4.19179 18.9892 4.2832L17.0891 14.4165C17.062 14.5617 16.9849 14.6927 16.8714 14.7871C16.7578 14.8815 16.6148 14.9332 16.4672 14.9333H5.06682C4.91917 14.9332 4.7762 14.8815 4.66263 14.7871C4.54906 14.6927 4.47204 14.5617 4.44487 14.4165L2.54608 4.3022L2.0394 2.26667H0.633353C0.465377 2.26667 0.304281 2.19994 0.185505 2.08117C0.0667281 1.96239 0 1.8013 0 1.63333ZM3.92932 4.8L5.59251 13.6667H15.9415L17.6047 4.8H3.92932ZM6.33353 14.9333C5.66163 14.9333 5.01724 15.2002 4.54214 15.6753C4.06703 16.1504 3.80012 16.7948 3.80012 17.4667C3.80012 18.1385 4.06703 18.7829 4.54214 19.258C5.01724 19.7331 5.66163 20 6.33353 20C7.00543 20 7.64981 19.7331 8.12492 19.258C8.60003 18.7829 8.86694 18.1385 8.86694 17.4667C8.86694 16.7948 8.60003 16.1504 8.12492 15.6753C7.64981 15.2002 7.00543 14.9333 6.33353 14.9333ZM15.2005 14.9333C14.5286 14.9333 13.8842 15.2002 13.4091 15.6753C12.934 16.1504 12.6671 16.7948 12.6671 17.4667C12.6671 18.1385 12.934 18.7829 13.4091 19.258C13.8842 19.7331 14.5286 20 15.2005 20C15.8724 20 16.5168 19.7331 16.9919 19.258C17.467 18.7829 17.7339 18.1385 17.7339 17.4667C17.7339 16.7948 17.467 16.1504 16.9919 15.6753C16.5168 15.2002 15.8724 14.9333 15.2005 14.9333ZM6.33353 16.2C6.66948 16.2 6.99167 16.3335 7.22922 16.571C7.46678 16.8085 7.60023 17.1307 7.60023 17.4667C7.60023 17.8026 7.46678 18.1248 7.22922 18.3623C6.99167 18.5999 6.66948 18.7333 6.33353 18.7333C5.99758 18.7333 5.67539 18.5999 5.43783 18.3623C5.20028 18.1248 5.06682 17.8026 5.06682 17.4667C5.06682 17.1307 5.20028 16.8085 5.43783 16.571C5.67539 16.3335 5.99758 16.2 6.33353 16.2ZM15.2005 16.2C15.5364 16.2 15.8586 16.3335 16.0962 16.571C16.3337 16.8085 16.4672 17.1307 16.4672 17.4667C16.4672 17.8026 16.3337 18.1248 16.0962 18.3623C15.8586 18.5999 15.5364 18.7333 15.2005 18.7333C14.8645 18.7333 14.5423 18.5999 14.3048 18.3623C14.0672 18.1248 13.9338 17.8026 13.9338 17.4667C13.9338 17.1307 14.0672 16.8085 14.3048 16.571C14.5423 16.3335 14.8645 16.2 15.2005 16.2Z"
                    fill="#252B42"
                  />
                </svg>
              </button>
            </Tooltip>
            <button
              aria-label="hide"
              aria-labelledby="hide"
              role="button"
              className="flex w-10 h-10 justify-center items-center border p-2.5 rounded-full border-solid border-[#E8E8E8] bg-white transition-all hover:scale-[1.1] duration-[250ms] ease-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M12.5 10C12.5 10.663 12.2366 11.2989 11.7678 11.7678C11.2989 12.2366 10.663 12.5 10 12.5C9.33696 12.5 8.70107 12.2366 8.23223 11.7678C7.76339 11.2989 7.5 10.663 7.5 10C7.5 9.33696 7.76339 8.70107 8.23223 8.23223C8.70107 7.76339 9.33696 7.5 10 7.5C10.663 7.5 11.2989 7.76339 11.7678 8.23223C12.2366 8.70107 12.5 9.33696 12.5 10Z"
                  fill="black"
                />
                <path
                  d="M2 10C2 10 5 4.5 10 4.5C15 4.5 18 10 18 10C18 10 15 15.5 10 15.5C5 15.5 2 10 2 10ZM10 13.5C10.9283 13.5 11.8185 13.1313 12.4749 12.4749C13.1313 11.8185 13.5 10.9283 13.5 10C13.5 9.07174 13.1313 8.1815 12.4749 7.52513C11.8185 6.86875 10.9283 6.5 10 6.5C9.07174 6.5 8.1815 6.86875 7.52513 7.52513C6.86875 8.1815 6.5 9.07174 6.5 10C6.5 10.9283 6.86875 11.8185 7.52513 12.4749C8.1815 13.1313 9.07174 13.5 10 13.5Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <Snackbar
        open={openCartSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseCart}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        message=" Item successfully added to cart!"
      />
      <Snackbar
        open={openWishlistSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseWishlist}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        message=" Item successfully added to wishlist!"
      />
    </div>
  );
}
