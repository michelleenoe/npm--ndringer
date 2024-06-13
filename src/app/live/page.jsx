"use client";
import { fetchAPI } from "../../app/api/api.js";
import { useState, useEffect } from "react";
import Image from "next/image.js";
import { krona_one } from "@/app/fonts";
import Link from "next/link.js";

export default function Schedule() {
  const [lineUp, setLineUp] = useState([]);
  // Opretter en state variabel lineUp og en funktion setLineUp til at opdatere den, initialiseret som en tom array.

  const [schedule, setSchedule] = useState({});
  // Opretter en state variabel schedule og en funktion setSchedule til at opdatere den, initialiseret som et tomt objekt.

  useEffect(() => {
    // useEffect hook kører, når komponenten mounts.

    const loadSchedule = async () => {
      // Definerer en asynkron funktion loadSchedule til at hente data.

      const bandsData = await fetchAPI("/bands");
      // Henter data fra "/bands" API'et og gemmer resultatet i bandsData variablen.

      const scheduleData = await fetchAPI("/schedule");
      // Henter data fra "/schedule" API'et og gemmer resultatet i scheduleData variablen.

      setLineUp(bandsData);
      // Opdaterer lineUp state variablen med bandsData.

      setSchedule(scheduleData);
      // Opdaterer schedule state variablen med scheduleData.
    };

    loadSchedule();
    // Kalder loadSchedule funktionen for at hente data, når komponenten mountes (mountes --> tilføjet til DOM & er synlig på siden)
  }, []);
  // Det tomme array som det andet argument betyder, at denne useEffect kun kører én gang, når komponenten mountes.


  const getBandSchedule = () => {
    // Definerer en funktion getBandSchedule til at få bandets tidsplan.

    let actsForScene = [];
    // Initialiserer et tom array actsForScene.

    Object.entries(schedule).forEach(([sceneName, sceneSchedule]) => {
      // Itererer over entries i schedule objektet. (iterere --> gennemgå elementer i arrayet en ad gangen)
      // entires = [["scene1", {day1: [act1, act2], day2: [act3, act4]}], ["scene2", {day1: [act5, act6], day2: [act7, act8]}]]
      //entires = returnerer array med key, value 
      // sceneName er nøglen i objektet, og sceneSchedule er værdien i objektet.

      Object.entries(sceneSchedule).forEach(([day, acts]) => {
        // Itererer over entries i sceneSchedule objektet.

        actsForScene = actsForScene.concat(
          acts.map((act) => ({
            ...act,
            scene: sceneName,
            day,
          })) || []
        );
        // Tilføjer hvert act til actsForScene arrayet med yderligere scene og dagsinformation.
      });
    });

    const bandsMap = lineUp.reduce((map, band) => {
      // Reducerer lineUp arrayet til et map med bandets navn som nøgle.
      //array --> objekt 

      map[band.name] = band;
      return map;
    }, {});

    return actsForScene.map((act) => ({
      // Mapper over actsForScene arrayet for at inkludere band information i hvert act.
      ...act,
      // spread operator --> sprede eller kopiere alle properties fra 'act' objektet ind i et nyt objekt
      // en måde at kopiere alle nøgle-værdi par fra et objekt til et andet
      band: act.act !== "break" ? bandsMap[act.act] : null,
    }));
  };

  const bandSchedule = getBandSchedule();
  // Henter bandets tidsplan ved at kalde getBandSchedule funktionen.


  const getDateTime = (day, time) => {
    // Definerer en funktion getDateTime til at konvertere dag og tid til en DateTime.

    const today = new Date();
    // Får dagens dato.

    const dayOffset =
      (["sun", "mon", "tue", "wed", "thu", "fri", "sat"].indexOf(day) +
        7 -
        today.getDay()) %
      7;
    // Beregner antallet af dage indtil den specificerede dag.

    const [hours, minutes] = time.split(":").map(Number);
    // Splitter tiden i timer og minutter og konverterer dem til numre.

    const eventDate = new Date(today);
    // Opretter en ny Date baseret på dagens dato.

    eventDate.setDate(today.getDate() + dayOffset);
    // Indstiller datoen til den specificerede dag.

    eventDate.setHours(hours);
    // Indstiller timerne.

    eventDate.setMinutes(minutes);
    // Indstiller minutterne.

    eventDate.setSeconds(0);
    // Indstiller sekunderne til 0.

    eventDate.setMilliseconds(0);
    // Indstiller millisekunderne til 0.

    return eventDate;
    // Returnerer den beregnede dato og tid.
  };

  const sortedBandSchedule = bandSchedule
    .map((act) => ({
      // Mapper over bandSchedule arrayet for at inkludere start og slut tidspunkter.
      ...act,
      startDateTime: getDateTime(act.day, act.start),
      endDateTime: getDateTime(act.day, act.end),
    }))
    .sort((a, b) => a.startDateTime - b.startDateTime);
    // Sorterer bandSchedule arrayet baseret på start tidspunkter.


    const now = new Date();
    // Får det aktuelle tidspunkt.
  

    const groupedByScene = Object.keys(schedule).reduce((acc, scene) => {
      // Reducerer schedule objektet til et nyt objekt, grupperet efter scene.
  
      const currentAct = sortedBandSchedule.find(
        (act) =>
          act.scene === scene &&
          now >= act.startDateTime &&
          now <= act.endDateTime
      );
      // Finder den aktuelle act baseret på den nuværende tid og scenen.
  
      let nextAct = null;
      if (!currentAct) {
        nextAct = sortedBandSchedule.find(
          (act) => act.scene === scene && now < act.startDateTime
        );
      }
      // Hvis der ikke er nogen aktuelt act, finder det næste act for scenen.
  
      const currentOrNextAct = currentAct
        ? [currentAct]
        : nextAct
        ? [nextAct]
        : [];
      // Vælger enten den aktuelle act eller den næste act, eller en tom array hvis ingen findes.
  
      acc[scene] = currentOrNextAct;
      // Tilføjer scenen og dens aktuelle eller næste act til det akkumulerede objekt.
  
      return acc;
    }, {});
    // Starter med et tomt objekt og bygger det op ved at tilføje scenerne og deres acts.
    //iteraton --> tilføjer nøgler og værdier baseret på indhold
    //acc --> akkumulerede objekt er resultatet af iterationen.
  

  return (
    <article>
      <h1 className={`${krona_one.className} headliner text-center`}>
        {" "}
        Spiller nu
      </h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-5">
        {Object.keys(groupedByScene).map((scene) => (
          <div key={scene}>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl mr-2">{scene}</h2>
              {groupedByScene[scene].length > 0 && (
                <time className="text-2xl">
                  {groupedByScene[scene][0].start}
                </time>
              )}
            </div>
            <div className="overflow-hidden bg-secondaryBgColor p-8 rounded-lg shadow-md shadow-primaryColor relative">
              {groupedByScene[scene].length > 0 ? (
                <ul className="divide-y divide-gray-700">
                  {groupedByScene[scene].map((act) => (
                    <li
                      key={`${act.act}-${act.scene}`}
                      className="flex items-center p-4"
                    >
                      {act.act && (
                        <Link
                          href={act.band?.slug || "#"}
                          prefetch={false}
                          className="flex items-center space-x-4 w-full focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor duration-300 transform hover:scale-105 group"
                        >
                          <div className="flex-shrink-0">
                            {act.band && (
                              <div className="relative h-24 w-24 md:w-32 md:h-32">
                                <Image
                                  src={
                                    act.band.logo.includes("https")
                                      ? act.band.logo
                                      : `/logos/${act.band.logo}`
                                  }
                                  fill
                                  loading="lazy"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                  alt={`Billede af ${act.act}`}
                                  className="rounded-full object-cover grayscale duration-300 transform group-hover:grayscale-0"
                                />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`${krona_one.className} text-lg`}>
                              {act.act}
                            </p>
                          </div>
                        </Link>
                      )}
                      {act.act === "break" && (
                        <div className="relative h-24 w-24 md:w-32 md:h-32 flex items-center justify-center">
                          <span
                            className={`${krona_one.className} text-lg`}
                          ></span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="p-4">
                  På nuværende tidspunkt, er der ingen der spiller.
                </p>
              )}
            </div>
          </div>
        ))}
      </section>
    </article>
  );
}
