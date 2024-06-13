import Link from "next/link";
import { krona_one } from "@/app/fonts";
import Button from "@/components/globals/Button";

export default function NotFound() {
  return (
    <section className="grid grid-cols-gridContent">
      <div className="col-start-2 col-end-5">
        <div>
          <h1 className={`${krona_one.className} bandheader`}>
            Siden findes ikke
          </h1>
        </div>
        <p className="pb-8 small-size max-w-2xl">
          Siden du prøver at finde, findes desværre ikke på FooFest 2024.
        </p>
        <div className="flex items-center">
          <Link href="/">
            <Button title="Gå tilbage til forsiden" />
          </Link>
        </div>
      </div>
    </section>
  );
}
