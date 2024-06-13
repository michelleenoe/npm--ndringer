"use client";

import { useState } from "react";
import RegularTicketSVG from "./RegularTicketSVG";
import VIPTicketSVG from "./VIPTicketSVG";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import prices from "../backend/settings.js";

function calculateTotalPrice(ticketQuantity, ticketType, campingOptions) {
  const ticketPrice =
    ticketQuantity * (ticketType === "regular" ? prices.regular : prices.vip);
  const addOnPrice =
    (campingOptions.greenCamping ? prices.greenCamping : 0) +
    campingOptions.twoPersonTent * prices.TwoPersonsTent +
    campingOptions.threePersonTent * prices.ThreePersonsTent;
  return ticketPrice + addOnPrice + prices.fee;
}

export default function CartSummary({
  ticketType,
  ticketQuantity,
  campingOptions,
}) {
  const [isOpen, setOpen] = useState(false);

  const TicketSVG = ticketType === "regular" ? RegularTicketSVG : VIPTicketSVG;

  return (
    <>
      <button
        onClick={() => setOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-primaryColor text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
        aria-expanded={isOpen}
        aria-controls="cart-summary"
        aria-label="Åbn kurv"
      >
        <ShoppingCartIcon className="w-6 h-6" aria-hidden="true" />
      </button>
      {isOpen && (
        <div
          id="cart-summary"
          className="backdrop-blur-md fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-30"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-summary-title"
        >
          <div className="relative bg-secondaryBgColor rounded-lg p-8 shadow-md shadow-primaryColor w-full max-w-md ">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-3 text-3xl focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor rounded-lg"
              aria-expanded={isOpen}
              aria-controls="cart-summary"
              aria-label="Luk kurv"
            >
              ×
            </button>
            <p
              id="cart-summary-title"
              className="medium-size font-semibold text-primaryTextColor"
            >
              Kurvens indhold
            </p>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-center gap-10">
                <div>
                  <p className="small-size">
                    {/* ChatGpt prompt: Jeg arbejder på en React-komponent og jeg vil gerne vise billettypen (`ticketType`) med det første bogstav som stort og resten som småt*/}
                    {ticketType.charAt(0).toUpperCase() + ticketType.slice(1)}{" "}
                    billet x {ticketQuantity}
                  </p>
                  {campingOptions.selectedArea && (
                    <p className="small-size">
                      Campingområde: {campingOptions.selectedArea}
                    </p>
                  )}
                  {campingOptions.twoPersonTent > 0 && (
                    <p className="small-size">
                      2 personers telt x {campingOptions.twoPersonTent}
                    </p>
                  )}
                  {campingOptions.threePersonTent > 0 && (
                    <p className="small-size">
                      3 personers telt x {campingOptions.threePersonTent}
                    </p>
                  )}
                  <p className="small-size">
                    Booking gebyr: <br /> {prices.fee} kr.
                  </p>
                </div>
                <div className="flex justify-center ">
                  <TicketSVG className=" h-40 w-40" aria-hidden="true" />
                </div>
              </div>
              <p className="medium-size font-bold text-right">
                I alt:{" "}
                {calculateTotalPrice(
                  ticketQuantity,
                  ticketType,
                  campingOptions
                )}{" "}
                DKK
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
