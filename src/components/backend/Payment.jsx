import { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { fetchAPI, saveOrderToSupabase } from "../../app/api/api.js";
import { krona_one } from "@/app/fonts.jsx";

export default function Payment({ bookingData, onNext, onBack }) {
  const {
    reservationId,
    personalInfo,
    ticketQuantity,
    ticketType,
    orderId,
    totalPrice,
  } = bookingData;
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focused, setFocused] = useState("");
  // Opretter state variabler og deres tilhørende opdateringsfunktioner til at håndtere betalingsdetaljer.


  const handleCompletePurchase = async (event) => {
    event.preventDefault();
    // Forhindrer standard form submission (reload)

    const form = event.target.closest("form");
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    // Tjekker om formen er gyldig. Hvis ikke, viser den fejlmeddelelser.

    await fetchAPI("/fullfill-reservation", {
      method: "POST",
      body: JSON.stringify({ id: reservationId }),
    });
    // Sender en POST-anmodning til "/fullfill-reservation" endpointet for at fuldføre reservationen.

    const orderData = personalInfo.map((info) => ({
      first_name: info.firstName,
      last_name: info.lastName,
      amount: ticketQuantity,
      email: info.email,
      phone: info.phoneNumber,
      birthday: info.dateOfBirth,
      ordrenummer: orderId,
      tickettype: ticketType,
    }));
    // Mapper personalInfo arrayet til et nyt array med nødvendige felter for at gemme ordren.

    await saveOrderToSupabase(orderData);
    // Gemmer ordreData i Supabase ved at kalde saveOrderToSupabase funktionen.

    onNext({ ...bookingData, orderId });
    // Kalder onNext funktionen med opdateret bookingData for at gå til næste trin.
  };


  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setCardNumber(value);
  };

  const handleCardNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-ZæøåÆØÅ\s]/g, "");
    setCardName(value);
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 4) {
      value = value.slice(0, 4);
    }

    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }

    setExpiry(value);
  };

  const handleCvcChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setCvc(value);
  };

  return (
    <div className="grid grid-cols-gridContent">
      <div className="pt-8 pb-16 col-start-3 gap-3 flex flex-wrap items-center justify-center">
        <div className="bg-secondaryBgColor rounded-lg p-8 shadow-md shadow-primaryColor w-full max-w-md">
          <h2
            className={`${krona_one.className} large-size text-primaryTextColor mb-5`}
          >
            Betalingsside
          </h2>
          <div className="mb-6">
            <Cards
              number={cardNumber}
              name={cardName}
              expiry={expiry}
              cvc={cvc}
              focused={focused}
            />
            <form className="space-y-4 mt-5" noValidate>
              <div>
                <label htmlFor="cardNumber" className="block small-size">
                  Kortnummer
                </label>
                <input
                  required
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  className="w-full p-2 bg-inputFieldColor text-bgColor rounded-lg focus:outline-none focus:ring-2 focus:ring-accentColor"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  onFocus={(e) => setFocused(e.target.name)}
                  maxLength="16"
                  aria-label="Indtast kortnummer"
                />
              </div>
              <div>
                <label htmlFor="cardName" className="block small-size">
                  Navn på kortet
                </label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  className="w-full p-2 bg-inputFieldColor text-bgColor rounded-lg focus:outline-none focus:ring-2 focus:ring-accentColor"
                  value={cardName}
                  onChange={handleCardNameChange}
                  onFocus={(e) => setFocused(e.target.name)}
                  aria-label="Indtast navn på kortet"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <div>
                  <label htmlFor="expiry" className="block small-size">
                    Udløbsdato (YY/MM)
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    name="expiry"
                    className="w-full p-2 bg-inputFieldColor text-bgColor rounded-lg focus:outline-none focus:ring-2 focus:ring-accentColor"
                    value={expiry}
                    onChange={handleExpiryChange}
                    onFocus={(e) => setFocused(e.target.name)}
                    maxLength="5"
                    aria-label="Indtast udløbsdato (YY/MM)"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cvc" className="block small-size">
                    CVC
                  </label>
                  <input
                    type="text"
                    id="cvc"
                    name="cvc"
                    className="w-full p-2 bg-inputFieldColor text-bgColor rounded-lg focus:outline-none focus:ring-2 focus:ring-accentColor"
                    value={cvc}
                    onChange={handleCvcChange}
                    onFocus={(e) => setFocused(e.target.name)}
                    maxLength="3"
                    aria-label="Indtast CVC"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-between pt-10">
                <button
                  onClick={onBack}
                  className="bg-bgColor border-2 rounded-lg border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                  aria-label="Tilbage"
                >
                  Tilbage
                </button>
                <button
                  onClick={handleCompletePurchase}
                  type="submit"
                  className="bg-bgColor border-2 rounded-lg border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                  aria-label="Gennemfør betaling"
                >
                  Gennemfør betaling
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
