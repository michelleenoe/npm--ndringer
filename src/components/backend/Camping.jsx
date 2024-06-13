import { useState, useEffect } from "react";
import prices from "../backend/settings.js";
import { fetchAPI } from "../../app/api/api.js";
import {
  Field,
  Label,
  Select,
  Checkbox,
  Fieldset,
  Legend,
} from "@headlessui/react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { krona_one } from "@/app/fonts.jsx";
import CartSummary from "./CartSummary";

//hjælpe funktion som beregner den totale pris baseret på antal billetter, billettype og campingmuligheder.
//Det inkluderer prisen for billetter, campingtilvalg og et fast gebyr.
function calculateTotalPrice(ticketQuantity, ticketType, campingOptions) {
  const ticketPrice =
    ticketQuantity * (ticketType === "regular" ? prices.regular : prices.vip);
  const addOnPrice =
    (campingOptions.greenCamping ? prices.greenCamping : 0) +
    campingOptions.twoPersonTent * prices.TwoPersonsTent +
    campingOptions.threePersonTent * prices.ThreePersonsTent;
  return ticketPrice + addOnPrice + prices.fee;
}

export default function Camping({
  //Denne funktion definerer Camping komponenten camping.jsx
  // komponentet modtager flere props, som bruges til at initialisere state og håndtere brugerinteraktioner.
  ticketQuantity, //1
  ticketType, //2
  campingOptions, //3
  onClick, //4
  onNext, //5
  onBack, //6
  setBookingData, //7
}) {
  //Herunder oprettes flere state variabler ved hjælp af useState hook (som er en del af react-bibloteket):

  const [greenCamping, setGreenCamping] = useState(
    //greenCamping og setGreenCamping: Holder styr på om grøn camping er valgt.
    campingOptions.greenCamping || false //boolean
  );
  const [twoPersonTent, setTwoPersonTent] = useState(
    //twoPersonTent og setTwoPersonTent: Holder styr på om 2 personers telte er valgt.
    campingOptions.twoPersonTent || 0
  );
  const [threePersonTent, setThreePersonTent] = useState(
    //threePersonTent og setThreePersonTent: Holder styr på om 3 personers telte er valgt.
    campingOptions.threePersonTent || 0
  );

  const [campingAreas, setCampingAreas] = useState([]);
  //campingAreas og setCampingAreas: Holder styr på tilgængelige campingområder hentet fra API.

  const [selectedArea, setSelectedArea] = useState(
    //selectedArea og setSelectedArea: Holder styr på det valgte campingområde.
    campingOptions.selectedArea || ""
  );
  const [totalPrice, setTotalPrice] = useState(0);
  //totalPrice og setTotalPrice: Holder styr på den totale pris.
  const [errorMessage, setErrorMessage] = useState("");
  //errorMessage og setErrorMessage: Holder styr på fejlmeddelelser.

  useEffect(() => {
    // useEffect tager to argumenter:
    // En funktion, der beskriver den effekt vi ønsker at køre.
    // En array af afhængigheder, som bestemmer hvornår effekten skal køres igen. Hvis denne array er tom, vil effekten kun køre én gang, når komponenten monteres.

    //Inden i useEffect definerer vi en asynkron funktion ved navn loadCampingAreas.
    // Asynkrone funktioner tillader brugen af await inden i dem, hvilket gør det muligt at vente på, at en Promise bliver opfyldt.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

    const loadCampingAreas = async () => {
      const data = await fetchAPI("/available-spots"); // Inde i loadCampingAreas funktionen kaldes fetchAPI med endpointet "/available-spots".
      //Denne funktion returnerer en Promise, som venter på at blive opfyldt ved at bruge await.
      //Resultatet af denne operation gemmes i variablen data.
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
      setCampingAreas(data); // Efter at have hentet data fra API'en, bruges setCampingAreas funktionen til at opdatere campingAreas state variablen med de data, vi modtog.
      //Komponenten re-renderer med de nye campingområder.
    };
    loadCampingAreas(); //Kalder loadCampingAreas funktionen for faktisk at udføre de trin, vi har defineret: 
    //hente data fra API'en og opdatere state variablen.

    //Det tomme array som det andet argument til useEffect betyder, at denne effekt kun skal køres én gang.
    // nemlig når komponenten først mountes.

  }, []); //det her er det tomme array

  //Opsummering:

    // Definere en asynkron funktion loadCampingAreas, som henter data fra "/available-spots" API'en.
    //Når dataene er hentet, opdaterer den campingAreas state variablen med disse data.
    //Kalde loadCampingAreas funktionen med det samme for at udføre de ovennævnte trin.
    //Fordi afhængighedsarrayet er tomt, vil denne process kun ske én gang ved komponentens initiale rendering.




// useEffect hook kører, når nogen af variablerne greenCamping, twoPersonTent, threePersonTent, ticketQuantity, eller ticketType ændres.
useEffect(() => {
  // Opretter et nyt objekt "campingOptions" med værdierne "greenCamping", "twoPersonTent", og "threePersonTent".
  const campingOptions = { greenCamping, twoPersonTent, threePersonTent };
  
  // Beregner den totale pris ved at kalde "calculateTotalPrice" funktionen med "ticketQuantity", "ticketType", og "campingOptions".
  const totalPrice = calculateTotalPrice(
    ticketQuantity, // Sender "ticketQuantity" til calculateTotalPrice.
    ticketType, // Sender "ticketType" til calculateTotalPrice.
    campingOptions // Sender "campingOptions" til calculateTotalPrice.
  );
  
  // Opdaterer "totalPrice" state variablen med den beregnede totale pris.
  setTotalPrice(totalPrice);
}, [
 
 
  // Array af afhængigheder: Denne useEffect kører igen, når nogen af disse variabler ændres.
  greenCamping, // Afhængighed: "greenCamping".
  twoPersonTent, // Afhængighed: "twoPersonTent".
  threePersonTent, // Afhængighed: "threePersonTent".
  ticketQuantity, // Afhængighed: "ticketQuantity".
  ticketType, // Afhængighed: "ticketType".

]);


// useEffect hook kører, når nogen af variablerne greenCamping, twoPersonTent, threePersonTent, eller selectedArea ændres.
useEffect(() => {
  // Kalder "onClick" funktionen med et objekt, der indeholder de opdaterede campingdata.
  onClick({
    camping: { greenCamping, twoPersonTent, threePersonTent, selectedArea }, // Campingdata: "greenCamping", "twoPersonTent", "threePersonTent", "selectedArea".
  });
}, [
  // Array af afhængigheder: Denne useEffect kører igen, når nogen af disse variabler ændres.
  greenCamping, // Afhængighed: "greenCamping".
  twoPersonTent, // Afhængighed: "twoPersonTent".
  threePersonTent, // Afhængighed: "threePersonTent".
  selectedArea, // Afhængighed: "selectedArea".
]);


// Funktion til at håndtere ændring af teltmængde baseret på typen af telt og inkrementet (stigning +1 / -1).
const handleQuantityChange = (type, increment) => {
  // Hvis typen er "twoPersonTent":
  if (type === "twoPersonTent") {
    // Opdaterer "twoPersonTent" state variablen.
    setTwoPersonTent((prev) => {
      const newQuantity = Math.max(0, prev + increment); // Beregner den nye mængde og sikrer, at den ikke er negativ.
      const totalTents = newQuantity + threePersonTent; // Beregner det totale antal telte.
      return totalTents <= ticketQuantity ? newQuantity : prev; // Returnerer den nye mængde, hvis den ikke overstiger antallet af billetter.
    });
  // Hvis typen er "threePersonTent":
  } else if (type === "threePersonTent") {
    // Opdaterer "threePersonTent" state variablen.
    setThreePersonTent((prev) => {
      const newQuantity = Math.max(0, prev + increment); // Beregner den nye mængde og sikrer, at den ikke er negativ.
      const totalTents = twoPersonTent + newQuantity; // Beregner det totale antal telte.
      return totalTents <= ticketQuantity ? newQuantity : prev; // Returnerer den nye mængde, hvis den ikke overstiger antallet af billetter.
    });
  }
};


 // Asynkron funktion til at håndtere form submission.
const handleSubmit = async (event) => {
  event.preventDefault(); // Forhindrer standard form submission.

  // Tjekker om et campingområde er valgt. Hvis ikke, sætter den en fejlmeddelelse.
  if (!selectedArea || selectedArea === "") {
    setErrorMessage("Du skal vælge et campingområde, inden du kan gå videre."); // Sætter fejlmeddelelse.
    return; // Stopper yderligere udførelse --> så man ikke kan gøre noget, før det er "opfyldt"
  }

  // Kalder API'en for at reservere en campingplads med de valgte muligheder.
  const reservation = await fetchAPI("/reserve-spot", {
    method: "PUT", // HTTP-metode PUT for at opdatere /reserve-spot m. antal og område.
    body: JSON.stringify({
      area: selectedArea, // Valgte campingområde.
      amount: ticketQuantity, // Antal billetter.
    }),
  });

  // Opdaterer "bookingData" state med de nye data inklusive det modtagne reservation ID.
  setBookingData((old) => ({
    ...old, // Beholder de tidligere værdier.
    area: selectedArea, // Opdaterer med det valgte område.
    ticketQuantity, // Opdaterer med antal billetter.
    ticketType, // Opdaterer med billettypen.
    greenCamping, // Opdaterer med greenCamping.
    twoPersonTent, // Opdaterer med toPersonTent.
    threePersonTent, // Opdaterer med threePersonTent.
    orderId: reservation.id, // Tilføjer reservation ID.
  }));

  onNext(); // Kalder "onNext" funktionen for at gå videre til næste trin.
};


 // Filtrerer campingområderne for at kun vise dem, der har nok ledige pladser til det valgte antal billetter.
const filteredCampingAreas = campingAreas.filter(
  (area) => area.available >= ticketQuantity // Beholder kun de områder, hvor antallet af ledige pladser er større eller lig med antal billetter.
);

  return (
    <div className="grid grid-cols-gridContent">
      <div className="pt-8 pb-16 col-start-3 gap-3 flex flex-wrap items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-secondaryBgColor rounded-lg p-8 shadow-md shadow-primaryColor w-full max-w-md"
        >
          <Fieldset className="space-y-6">
            <Legend
              className={`${krona_one.className} large-size text-primaryTextColor`}
            >
              Camping Tilvalg
            </Legend>
            <p className="xsmall-size">
              Bemærk: Prisen inkluderer opsætning af dit telt af vores team
            </p>

            <Field className="space-y-4">
              <Label htmlFor="campingArea">Vælg Campingområde</Label>
              <div className="relative">
                <Select
                  id="campingArea"
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className={clsx(
                    "mt-1 block w-full appearance-none border-none rounded-lg bg-inputFieldColor text-bgColor py-2 px-5",
                    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accentColor"
                  )}
                  aria-label="Vælg campingområde"
                  required
                >
                  <option value="">Vælg campingområde</option>
                  {filteredCampingAreas.map((area) => (
                    <option key={area.area} value={area.area}>
                      {area.area} (Ledige pladser: {area.available})
                    </option>
                  ))}
                </Select>
                <ChevronDownIcon
                  className="pointer-events-none absolute top-2.5 right-2.5 size-5 fill-bgColor"
                  aria-hidden="true"
                />
              </div>
            </Field>

            <table className="min-w-full rounded-lg">
              <thead>
                <tr>
                  <th className="text-left px-4 py-3 rounded-tl-lg text-bgColor bg-primaryTextColor">
                    Tilvalg
                  </th>
                  <th className="text-center px-4 py-3 text-bgColor bg-primaryTextColor">
                    Antal
                  </th>
                  <th className="text-right px-4 py-3 rounded-tr-lg text-bgColor bg-primaryTextColor">
                    Pris
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 pb-2 pt-6">2 pers telt</td>
                  <td className="px-4 pb-2 pt-6 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange("twoPersonTent", -1)
                        }
                        aria-label="Decrease 2 person tent quantity"
                        className="px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                      >
                        -
                      </button>
                      <span>{twoPersonTent}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange("twoPersonTent", 1)}
                        aria-label="Increase 2 person tent quantity"
                        className="px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-4 pb-2 pt-6 text-right">
                    {prices.TwoPersonsTent} DKK
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2">3 pers telt</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange("threePersonTent", -1)
                        }
                        aria-label="Decrease 3 person tent quantity"
                        className="px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                      >
                        -
                      </button>
                      <span>{threePersonTent}</span>
                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange("threePersonTent", 1)
                        }
                        aria-label="Increase 3 person tent quantity"
                        className="px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-right">
                    {prices.ThreePersonsTent} DKK
                  </td>
                </tr>
                <tr>
                  <td className="px-4 pb-6 pt-2">Grøn camping</td>
                  <td className="px-4 pb-6 pt-4 flex justify-center text-center items-center">
                    <Checkbox
                      checked={greenCamping}
                      onChange={setGreenCamping}
                      className="h-6 w-6 rounded bg-inputFieldColor text-accentColor focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-accentColor"
                    >
                      {({ checked }) => (
                        <div
                          className={clsx(
                            checked ? "bg-accentColor" : "bg-inputFieldColor",
                            "flex items-center justify-center h-6 w-6 rounded "
                          )}
                        >
                          {checked && (
                            <CheckIcon
                              className="w-4 h-4 text-bgColor"
                              aria-hidden="true"
                            />
                          )}
                        </div>
                      )}
                    </Checkbox>
                  </td>
                  <td className="px-4 pb-6 pt-2 text-right">
                    {prices.greenCamping} DKK
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="px-4 py-2 text-right">
                    Booking gebyr: {prices.fee} DKK
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    className="text-center px-4 py-3 bg-primaryTextColor rounded-b-lg text-bgColor"
                  >
                    <strong>Total Pris: {totalPrice} DKK</strong>
                  </td>
                </tr>
                {errorMessage && (
                  <tr>
                    <td colSpan="3" className=" text-right px-4 py-2">
                      {errorMessage}
                    </td>
                  </tr>
                )}
              </tfoot>
            </table>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={onBack}
                className="bg-bgColor border-2 rounded-lg border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                aria-label="Tilbage"
              >
                Tilbage
              </button>
              <button
                type="submit"
                className="bg-bgColor border-2 rounded-lg border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                aria-label="Fortsæt"
              >
                Fortsæt
              </button>
            </div>
          </Fieldset>
        </form>

        <CartSummary
          ticketType={ticketType}
          ticketQuantity={ticketQuantity}
          campingOptions={campingOptions}
        />
      </div>
    </div>
  );
}
