import { RootState } from "@/redux/store";
import { Drawer, Rating } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { montserrat } from "@/pages";
import { clearWishlist, removeFromWishlist } from "@/redux/wishlist-slice";

export default function WishList({ iconSize }: { iconSize?: "sm" | "lg" }) {
  const { wishlist } = useSelector((state: RootState) => state.wishlist);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <button
        aria-label="wishlist"
        aria-labelledby="wishlist"
        role="button"
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
          <g clipPath="url(#clip0_540_815)">
            <path
              d="M8.0002 2.74805L7.2832 2.01105C5.6002 0.281049 2.5142 0.878049 1.4002 3.05305C0.8772 4.07605 0.7592 5.55305 1.7142 7.43805C2.6342 9.25305 4.5482 11.427 8.0002 13.795C11.4522 11.427 13.3652 9.25305 14.2862 7.43805C15.2412 5.55205 15.1242 4.07605 14.6002 3.05305C13.4862 0.878049 10.4002 0.280049 8.7172 2.01005L8.0002 2.74805ZM8.0002 15C-7.3328 4.86805 3.2792 -3.03995 7.8242 1.14305C7.8842 1.19805 7.9432 1.25505 8.0002 1.31405C8.05662 1.2551 8.11533 1.19839 8.1762 1.14405C12.7202 -3.04195 23.3332 4.86705 8.0002 15Z"
              fill="#23A6F0"
            />
          </g>
          <defs>
            <clipPath id="clip0_540_815">
              <rect
                width={iconSize === "sm" ? "16" : "37"}
                height={iconSize === "sm" ? "16" : "37"}
                fill="white"
                transform="translate(0.000305176)"
              />
            </clipPath>
          </defs>
        </svg>
        <p className="text-xs text-primaryColor w-2">{wishlist.length}</p>
      </button>

      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <div
          className={`flex flex-col gap-8 fixed w-[325px] max-h-[800px] rounded-lg overflow-y-scroll overflow-x-hidden px-4 py-8 top-[50%] left-[50%] 
          translate-x-[-50%] translate-y-[-50%] lg:left-[80%] bg-white ${montserrat.className}`}
        >
          <p className="text-base">
            <strong className="text-2xl">Wishlist</strong>, {wishlist.length}{" "}
            items
          </p>

          <div className="flex flex-col gap-[30px]">
            {wishlist.map((product) => (
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

                  <div className="flex flex-row max-h-[250px] relative">
                    <section className="flex flex-col justify-center items-center pr-[5px]">
                      <button
                        className="box-border border w-6 h-6 rounded-[5px] flex justify-center items-center border-solid border-[#1d1f22] hover:bg-[#1d1f22] group"
                        onClick={() => dispatch(removeFromWishlist(product.id))}
                      >
                        <p className="text-center font-medium group-hover:text-white">
                          -
                        </p>
                      </button>
                    </section>

                    <div className="relative inset-0 w-full h-[260px] object-cover">
                      <Image
                        src={product.thumbnail}
                        alt="item"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {wishlist.length > 0 && (
              <Button
                className=" w-[140px] h-[43px]"
                variant="secondary"
                onClick={() => dispatch(clearWishlist())}
              >
                Clear Wishlist
              </Button>
            )}

            <div className="hidden lg:block w-full h-px mx-0 my-5 bg-[#e5e5e5]" />
          </div>
        </div>
      </Drawer>
    </>
  );
}
