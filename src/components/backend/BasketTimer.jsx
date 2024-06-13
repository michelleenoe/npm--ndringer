import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/globals/Button";
import { krona_one } from "@/app/fonts.jsx";

function BasketTimer({ step, onTimeExpired }) {
  // Definerer en funktionel komponent (BasketTimer), som modtager props: step og onTimeExpired.

  const [timeLeft, setTimeLeft] = useState(10 * 60);
  // Opretter en state variabel timeLeft og en funktion setTimeLeft til at opdatere den, initialiseret til 10 minutter (600 sekunder).

  const [popup, setPopup] = useState(false);
  // Opretter en state variabel popup og en funktion setPopup til at opdatere den, initialiseret til false.


  useEffect(() => {
    // useEffect hook kører når komponenten mounts og hver gang step ændres.

    if (step < 3 || step > 5) return;
    // Hvis step er mindre end 3 eller større end 5 (komponenterne), returneres og resten af koden køres ikke.

    const timerId = setInterval(() => {
      // Starter en timer, der kører hvert sekund (1000 ms).
      setTimeLeft((prevTimeLeft) => Math.max(prevTimeLeft - 1, 0));
      // Opdaterer timeLeft ved at reducere den med 1 sekund. Sikrer, at timeLeft aldrig bliver negativ.
    }, 1000);

    return () => clearInterval(timerId);
    // Rydder timeren, når komponenten unmounts eller step ændres.
  }, [step]);
  // Denne useEffect kører igen, når step ændres.


  useEffect(() => {
    // useEffect hook kører når timeLeft eller popup ændres.

    if (timeLeft === 0 && !popup) {
      // Hvis timeLeft er 0 og popup ikke er vist:
      setPopup(true);
      // Sætter popup til true for at vise popup.
      onTimeExpired();
      // Kalder onTimeExpired funktionen, som blev modtaget som prop.
    }
  }, [timeLeft, popup, onTimeExpired]);
  // Denne useEffect kører igen, når timeLeft, popup, eller onTimeExpired ændres.


  const formatTime = (seconds) => {
    // Definerer en funktion formatTime til at formatere tiden fra sekunder til minutter og sekunder.
    const minutes = Math.floor(seconds / 60);
    // Beregner antallet af minutter.
    const secs = seconds % 60;
    // Beregner antallet af sekunder.
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    // Returnerer tiden i formatet mm:ss, tilføjer et ekstra nul foran sekunder hvis de er mindre end 10.
  };


  return (
    <>
      {step >= 3 && step <= 5 && (
        <div className="relative flex flex-col items-center justify-center h-full">
          <h1 className={`${krona_one.className} normal-size`}>
            Tid tilbage: {formatTime(timeLeft)}
          </h1>
          {popup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="absolute inset-0 backdrop-blur-md"></div>
              <div className="relative bg-secondaryBgColor p-8 shadow-primaryColor rounded-lg shadow-lg text-center max-w-md mx-auto">
                <h2 className="text-xl font-bold mb-4">Tiden er udløbet</h2>
                <p className="mb-4">Du kan starte dit køb forfra igen.</p>
                <div className="flex justify-between mt-4 space-x-4">
                  <Link href="/" passHref>
                    <Button
                      title="Gå til forsiden"
                      className="px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accentColor hover:bg-green-700 transition duration-300"
                    />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default BasketTimer;
