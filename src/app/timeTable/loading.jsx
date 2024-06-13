import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <section className="min-h-screen md:px-2">
      <div className="text-center headliner">
        <Skeleton width="50%" height="125px" />
      </div>
      <header className="flex justify-between gap-4 py-5 px-2 sm:px-4">
        <div className="w-1/2 lg:w-1/4">
          <Skeleton height="40px" />
        </div>
        <div className="w-1/2 lg:w-auto lg:hidden">
          <Skeleton height="40px" />
        </div>
        <div className="hidden h-fit lg:flex flex-wrap gap-4">
          <Skeleton width="80px" height="40px" />
          <Skeleton width="80px" height="40px" />
          <Skeleton width="80px" height="40px" />
          <Skeleton width="80px" height="40px" />
          <Skeleton width="80px" height="40px" />
        </div>
      </header>
      <div className="flex flex-col items-center py-5 w-full">
        <div className="flex flex-wrap justify-center items-center w-full gap-4">
          <div className="h-48 md:h-72">
            <Skeleton borderRadius height="80px" count={2} width="331px" />
          </div>
          <div className="h-48 md:h-72">
            <Skeleton borderRadius height="80px" count={2} width="331px" />
          </div>
          <div className="h-48 md:h-72">
            <Skeleton borderRadius height="160px" width="176px" />
          </div>
        </div>
      </div>
    </section>
  );
}
