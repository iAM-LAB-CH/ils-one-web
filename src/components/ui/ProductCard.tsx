"use client";

import Image from "next/image";
import { cn } from "@/lib/utils/cn";

export interface ProductCardData {
  id: string;
  ticker: string;
  price: string;
  title: string;
  description: string;
  redemptionDays: number;
  expectedProfit: string;
  image: string;
  accentColor: string;
  rotation: number;
  translateY: number;
}

interface ProductCardProps {
  card: ProductCardData;
  className?: string;
  style?: React.CSSProperties;
}

export function ProductCard({ card, className, style }: ProductCardProps) {
  const { ticker, price, title, description, redemptionDays, expectedProfit, image, accentColor } = card;

  return (
    <div
      className={cn("group", className)}
      style={style}
    >
      {/* Inner card with hover effects - separated from positioning transform */}
      <div
        className={cn(
          "w-[375px]",
          "bg-[#fcfcfc] rounded-[28px]",
          "p-5",
          "shadow-[0px_0px_244px_0px_rgba(0,0,0,0.35)]",
          "transition-all duration-500 ease-out",
          "group-hover:scale-[1.02] group-hover:-translate-y-6",
          "group-hover:shadow-[0px_20px_60px_0px_rgba(0,0,0,0.4)]",
          "cursor-pointer"
        )}
      >
      {/* Card Image */}
      <div className="relative h-[174px] w-full overflow-hidden rounded-[24px] mb-4">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="375px"
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-col gap-2 flex-1">
        {/* Header with ticker and price */}
        <div className="flex items-center gap-1">
          <div
            className="w-4 h-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: accentColor }}
          >
            <div className="w-2 h-2 rounded-full bg-white/80" />
          </div>
          <span className="text-xs font-semibold text-black leading-[1.1]">
            {ticker}
          </span>
          <span className="text-xs font-semibold text-black/30 leading-[1.1]">
            / {price}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[36px] font-semibold text-black leading-[1.1]">
          {title}
        </h3>

        {/* Description */}
        <p className="text-base font-medium text-black leading-[1.4] line-clamp-2">
          {description}
        </p>

        {/* Info Boxes */}
        <div className="flex flex-col gap-3 mt-auto pt-4">
          {/* Redemption Button (disabled style) */}
          <div className="bg-[rgba(252,252,252,0.8)] border border-black/5 rounded-2xl p-4 shadow-[0px_0px_20px_0px_rgba(0,0,0,0.04)]">
            <p className="text-base font-medium text-black/20 text-center leading-[1.25]">
              Redemption in {redemptionDays} days
            </p>
          </div>

          {/* Info Cards Row */}
          <div className="flex gap-3">
            {/* Redemption Info */}
            <div className="flex-1 bg-[#fcfcfc] border border-[#f5f5f5] rounded-[20px] p-4 shadow-[0px_0px_20px_0px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-1 mb-2">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="text-black">
                  <rect x="1" y="2" width="9" height="8" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M3 1V3M8 1V3M1 5H10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <span className="text-xs font-medium text-black leading-[1.1]">
                  Redemption in
                </span>
              </div>
              <p className="text-base font-semibold text-black leading-[1.1]">
                {redemptionDays} days
              </p>
            </div>

            {/* Expected Profit */}
            <div className="flex-1 bg-[#fcfcfc] border border-[#f5f5f5] rounded-[20px] p-4 shadow-[0px_0px_20px_0px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-1 mb-2">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="text-black">
                  <path d="M5.5 1V10M3.5 3.5C3.5 2.67 4.4 2 5.5 2C6.6 2 7.5 2.67 7.5 3.5C7.5 4.33 6.6 5 5.5 5C4.4 5 3.5 5.67 3.5 6.5C3.5 7.33 4.4 8 5.5 8C6.6 8 7.5 7.33 7.5 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <span className="text-xs font-medium text-black leading-[1.1]">
                  Expected profit
                </span>
              </div>
              <p className="text-base font-semibold text-black leading-[1.1]">
                {expectedProfit}
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
