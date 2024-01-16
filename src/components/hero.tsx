import React from "react";

export default function Hero() {
  return (
    <section className="flex flex-col items-center lg:items-start xl:items-center justify-center py-6 sm:py-20 sm:px-10">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-[15px]">
        <div className="relative bg-[url('/assets/images/furniture-1.png')] w-[331px] h-[300px] sm:w-[451px] lg:w-[331px] xl:w-[451px] sm:h-[616px] object-cover flex-shrink-0">
          <div className="absolute space-y-[5px] p-6">
            <p className="text-successTextColor text-sm font-bold">5 Items</p>
            <p className="text-2xl sm:text-[40px] font-bold">FURNITURE</p>
            <p className="text-sm font-bold">Read More</p>
          </div>
        </div>
        <div className="space-y-[15px]">
          <div className="relative bg-[url('/assets/images/furniture-2.png')] w-[331px] h-[300px] sm:w-[451px] xl:w-[678px] lg:w-[580px] object-cover flex-shrink-0">
            <div className="absolute space-y-[5px] p-6">
              <p className="text-successTextColor text-sm font-bold">5 Items</p>
              <p className="text-2xl sm:text-[40px] font-bold">FURNITURE</p>
              <p className="text-sm font-bold">Read More</p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <div className="relative bg-[url('/assets/images/furniture-3.png')] w-[331px] h-[300px] sm:w-[451px] lg:w-[280px] xl:w-[331px] object-cover flex-shrink-0">
              <div className="absolute space-y-[5px] p-6">
                <p className="text-successTextColor text-sm font-bold">
                  5 Items
                </p>
                <p className="text-2xl sm:text-[40px] font-bold">FURNITURE</p>
                <p className="text-sm font-bold">Read More</p>
              </div>
            </div>
            <div className="relative bg-[url('/assets/images/furniture-4.png')] w-[331px] h-[300px] sm:w-[451px] lg:w-[280px] xl:w-[331px] object-cover flex-shrink-0">
              <div className="absolute space-y-[5px] p-6">
                <p className="text-successTextColor text-sm font-bold">
                  5 Items
                </p>
                <p className="text-2xl sm:text-[40px] font-bold">FURNITURE</p>
                <p className="text-sm font-bold">Read More</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
