"use client";
import { krona_one } from "@/app/fonts";
import Button from "@/components/globals/Button";
import Link from "next/link";

export const metadata = {
  title: "Band findes ikke",
  description: "Bandet du leder efter spiller desværre ikke på FooFest",
};

export default function error() {
  return (
    <>
      <section className="grid grid-cols-gridContent">
        <article className="col-start-2 col-end-5">
          <h1 className={`${krona_one.className} bandheader`}>
            Der er sket en fejl
          </h1>
          <p className="pb-8 small-size max-w-2xl">
            Der er desværre sket en fejl. Det beklager vi meget.
          </p>
          <div className="flex items-center">
            <Link href="/">
              <Button title="Gå tilbage til forsiden" />
            </Link>
          </div>
        </article>
      </section>
    </>
  );
}
