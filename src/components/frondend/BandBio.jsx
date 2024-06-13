"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function BandBio({ bio }) {
  return (
    <div className="w-full rounded-xl bg-primaryTextColor">
      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <>
            <DisclosureButton
              className="w-full flex justify-between items-center text-secondaryTextColor px-5 py-4 border-b"
              aria-expanded={open}
            >
              <span>BIO</span>
              <ChevronDownIcon
                className={`size-5 fill-secondaryTextColor transition-transform duration-300 ${
                  open ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </DisclosureButton>
            <Transition
              enter="duration-300 ease-in-out"
              enterFrom="opacity-0 -translate-y-6"
              enterTo="opacity-100 translate-y-0"
              leave="duration-300 ease-in-out"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-5"
            >
              <DisclosurePanel className="leading-relaxed h-72 text-secondaryTextColor px-5 py-3 overflow-auto">
                <p className="xsmall-size">
                  {bio ? bio : "Biografien på dette band findes ikke"}
                </p>
              </DisclosurePanel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
}
