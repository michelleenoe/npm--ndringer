import { useState, useEffect } from "react";

import prices from "../backend/settings.js"; // Importerer prices fra settings.js  (som senere bliver brugt)
import { krona_one } from "@/app/fonts.jsx";

import {
  Select,
  RadioGroup,
  Radio,
  Field,
  Label,
  Legend,
  Fieldset,
} from "@headlessui/react";

import { CheckCircleIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

import clsx from "clsx";

import RegularTicketSVG from "./RegularTicketSVG";
import VIPTicketSVG from "./VIPTicketSVG";

export default function TicketsForm({//Definerer TicketsForm (komponentet // tickets.jsx) som en funktion. 
//Funktionen accepterer et objekt som argument (TicketsForm), og objektet opdeles i fire separate variabler:
  ticketType, //1
  ticketQuantity, //2 
  onClick, //3
  onNext, //4
   //Disse variabler repræsenterer props (modtaget fra parent booking/page.jsx), som passeres til komponentet (props passing) og bruges til at initialisere state og håndtere brugerinteraktioner.
}) {

  // Opretter lokale state variabler til at gemme billettype, billetantal og den totale pris.
  const [localTicketType, setLocalTicketType] = useState(ticketType);
  const [localQuantity, setLocalQuantity] = useState(ticketQuantity);
  const [localTotalPrice, setLocalTotalPrice] = useState(0);

  useEffect(() => {
    // UseEffect: Kører funktionen updatePrice, når state variablerne localTicketType og localQuantity ændres.
    updatePrice();
  }, [localTicketType, localQuantity]);

  // Funktion til at opdatere den totale pris baseret på billettype og antal billetter.
  const updatePrice = () => {
    const pricePerTicket =
      localTicketType === "regular" ? prices.regular : prices.vip;
    setLocalTotalPrice(localQuantity * pricePerTicket);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); //forhindrer den normale form submission, så siden ikke reloades --> når man trykker på submit (button)
    onClick({ ticketType: localTicketType, ticketQuantity: localQuantity }); //onClick kaldes med de lokale state værdier (localTicketType og localQuantity), hvilket opdaterer de overordnede bookingdata.
    onNext(); //kaldes for at navigere til næste trin i bookingprocessen.
  };

  // array som definerer de forskellige billettyper (Regular og VIP), billetpris og tilknyttede SVG ikoner.
  const ticketOptions = [
    { name: "Regular", price: prices.regular, SVG: RegularTicketSVG },
    { name: "VIP", price: prices.vip, SVG: VIPTicketSVG },
  ];

  return (
    <div className="grid grid-cols-gridContent">
      <div className="pt-8 pb-16 col-start-3 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-secondaryBgColor p-8 rounded-lg shadow-md shadow-primaryColor w-full max-w-md"
        >
          <Fieldset className="space-y-6">
            <Legend
              className={`${krona_one.className} large-size mb-1 text-primaryTextColor`}
            >
              Vælg billettype
            </Legend>
            <RadioGroup
              value={localTicketType}
              onChange={setLocalTicketType}
              className="space-y-6"
            >
              <Label>Billettype</Label>
              {ticketOptions.map((option) => (
                <Radio
                  key={option.name}
                  value={option.name.toLowerCase()}
                  className={({ active, checked }) =>
                    clsx(
                      "relative flex cursor-pointer rounded-lg bg-bgColor py-4 px-5 shadow-md transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor",
                      {
                        "ring-2 ring-offset-2 ring-accentColor": active,
                        "bg-primaryTextColor/10": checked,
                      }
                    )
                  }
                >
                  {({ checked }) => (
                    <div className="flex w-full items-center justify-between">
                      <div className="small-size flex items-center gap-3">
                        <option.SVG className="h-12 w-12" aria-hidden="true" />
                        <p className="text-primaryTextColor">
                          {option.name} {option.price} DKK
                        </p>
                      </div>
                      {checked && (
                        <CheckCircleIcon
                          className="size-7 fill-accentColor"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  )}
                </Radio>
              ))}
            </RadioGroup>
            <Field className="flex flex-col small-size">
              <Label htmlFor="ticketQuantity" className="mb-1 font-bold">
                Vælg antal billetter:
              </Label>
              <div className="relative">
                <Select
                  id="ticketQuantity"
                  value={localQuantity}
                  onChange={(e) =>
                    setLocalQuantity(parseInt(e.target.value, 10))
                  }
                  className={clsx(
                    "mt-1 block w-28 appearance-none border-none rounded-lg bg-inputFieldColor text-bgColor py-2 px-5",
                    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accentColor"
                  )}
                  aria-describedby="ticketQuantity-description"
                  required
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </Select>
                <ChevronDownIcon
                  className="pointer-events-none absolute top-3.5 left-20 size-5 fill-bgColor"
                  aria-hidden="true"
                />
              </div>
            </Field>
            <div className="normal-size">
              Total pris for billetter: {localTotalPrice} DKK
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-bgColor rounded-lg border-2 border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                aria-label="Køb billetter"
              >
                Køb billetter
              </button>
            </div>
          </Fieldset>
        </form>
      </div>
    </div>
  );
}
