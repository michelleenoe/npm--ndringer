import { krona_one } from "@/app/fonts.jsx";
import Button from "@/components/globals/Button";
import Link from "next/link";
import RegularTicketSVG from "./RegularTicketSVG";
import VIPTicketSVG from "./VIPTicketSVG";

export default function ConfirmationPage({ bookingData }) {
  const { orderId, personalInfo, totalPrice, ticketType } = bookingData;

  const TicketSVG = ticketType === "regular" ? RegularTicketSVG : VIPTicketSVG;

  return (
    <div className="grid grid-cols-gridContent">
      <div className="my-24 col-start-3 gap-3 flex flex-wrap items-center justify-center">
        <div className="bg-secondaryBgColor rounded-lg p-8 shadow-md shadow-primaryColor w-full max-w-md">
          <h2
            className={`${krona_one.className} text-center large-size text-primaryTextColor `}
          >
            Ordrebekræftelse
          </h2>
          <div className="flex items-center justify-center gap-10">
            <p className="normal-size ">Tak for dit køb! </p>
            <div className="flex justify-center ">
              <TicketSVG className=" h-40 w-40" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center ">
            <p>Dit ordrenummer er </p>
            <p className="font-bold large-size ">{orderId}</p>
          </div>
          <p className="normal-size my-8 text-center">
            En ordrebekræftelse er sendt til din email.
          </p>
          <div className="flex justify-between mb-6">
            <Link href="/timeTable/">
              <Button title="Tidsplan" />
            </Link>
            <Link href="/lineup/">
              <Button title="Line-up" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
