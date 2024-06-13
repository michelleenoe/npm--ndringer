"use client"; // køres på klienten --> ikke serveren 
import { useState } from "react"; //importerer hook fra Reactbiblo
import TicketsForm from "../../components/backend/Tickets";
import Camping from "../../components/backend/Camping";
import PersonalForm from "../../components/backend/PersonalForm";
import SummaryPage from "../../components/backend/Summary";
import PaymentPage from "../../components/backend/Payment";
import ConfirmationPage from "../../components/backend/Confirmation";
import ProgressBar from "../../components/backend/ProgressBar";
import BasketTimer from "../../components/backend/BasketTimer";



//Den opretter en state-variabel step med en initial værdi på 1. useState returnerer en array med to elementer: den aktuelle state-værdi (step) og en funktion til at opdatere den (setStep).
export default function BookingPage() {
  const [step, setStep] = useState(1);


    // opretter en state-variabel bookingData og en funktion setBookingData til at opdatere bookingData. Den initialiseres med et objekt, der indeholder standardværdier for bookingdata.
  const [bookingData, setBookingData] = useState({

    //objekt - initial indhold for bookingData
    ticketType: "regular",
    ticketQuantity: 1,
    camping: {},
    personalInfo: [],
    totalPrice: 0,
    orderId: "",
  });


//Dette er en funktion, der øger step med 1. 
//setStep(step + 1) kalder setStep med den nye værdi, hvilket får komponenten til at re-rendere med den opdaterede step værdi. 
//Funktionen bruges til at navigere til næste trin i bookingprocessen.
  const nextStep = () => setStep(step + 1);


  const prevStep = () => setStep(step - 1);

  //funktion til at gå til forrige komponent ved at mindske 'step' med 1. 

  const handleBookingChange = (data) => {
    console.log(data);
    setBookingData((prevData) => ({ ...prevData, ...data }));
  };
  //Dette er en funktion, der tager data som argument og opdaterer bookingData state. 
  //Den logger data til konsollen og kalder setBookingData med en funktion, der kombinerer de tidligere bookingdata (prevData) med de nye data (data) ved hjælp af spread operatoren. 
  //Dette sikrer, at de eksisterende data bevares, mens de nye data tilføjes eller opdateres.

  const handleTimeExpired = () => {
    setBookingData({
      ticketType: "regular",
      ticketQuantity: 1,
      camping: {},
      personalInfo: [],
      totalPrice: 0,
      orderId: "",
    });
  };

//Dette er en funktion, der nulstiller bookingData til dets initiale værdier.
//Når tiden til at fuldføre booking er udløbet, nulstiller funktionen alle bookingoplysninger.
  return (
    <div>
      <h1 className="hidden">Bookingside</h1>
      {step < 6 && <ProgressBar currentStep={step} />}
      {step < 6 && (
        <BasketTimer step={step} onTimeExpired={handleTimeExpired} />
      )}
      {step === 1 && (
        <TicketsForm
          setBookingData={setBookingData}
          ticketType={bookingData.ticketType}
          ticketQuantity={bookingData.ticketQuantity}
          onClick={handleBookingChange}
          onNext={nextStep}
        />
      )}
      {step === 2 && (
        <Camping
          setBookingData={setBookingData}
          ticketQuantity={bookingData.ticketQuantity}
          ticketType={bookingData.ticketType}
          campingOptions={bookingData.camping}
          onClick={handleBookingChange}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {step === 3 && (
        <PersonalForm
          setBookingData={setBookingData}
          personalInfo={bookingData.personalInfo}
          ticketQuantity={bookingData.ticketQuantity}
          ticketType={bookingData.ticketType}
          campingOptions={bookingData.camping}
          totalPrice={bookingData.totalPrice}
          onClick={handleBookingChange}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {step === 4 && (
        <SummaryPage
          setBookingData={setBookingData}
          bookingData={bookingData}
          onBack={prevStep}
          onNext={nextStep}
        />
      )}
      {step === 5 && (
        <PaymentPage
          setBookingData={setBookingData}
          bookingData={bookingData}
          onBack={prevStep}
          onNext={nextStep}
        />
      )}
      {step === 6 && (
        <ConfirmationPage
          setBookingData={setBookingData}
          bookingData={bookingData}
          orderId={bookingData.orderId}
        />
      )}
    </div>
  );
}
