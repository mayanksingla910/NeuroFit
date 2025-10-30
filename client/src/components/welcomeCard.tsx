import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faMedal } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "@tanstack/react-router";

export default function WelcomeCard() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col lg:flex-row justify-between md:items-center gap-8 p-6 bg-neutral-800/70 border border-neutral-700/60 shadow-md backdrop-blur-md hover:border-green-600/60 transition-all rounded-xl">
      <div className="flex-1 sm:w-full lg:w-1/2 2xl:w-2/3">
        <h1 className="text-3xl font-semibold text-gray-100">Hey Mayank</h1>
        <p className="text-neutral-400 text-base mt-2">
          Ready to crush today’s fitness goals?
        </p>
        <Button
          variant="link"
          onClick={() => {
            navigate({ to: "/exercise" });
          }}
          className="text-green-500/80 hover:text-green-500 px-0 mt-3 transition-all"
        >
          Start Exercising →
        </Button>
      </div>

      <div className="flex sm:flex-row flex-col gap-6 sm:w-full lg:w-1/2 2xl:w-1/3 ">
        <div className="hidden lg:block h-28 w-px rounded-lg bg-neutral-700/70" />
        <div className="flex flex-col w-full justify-center">
          <h2 className="text-lg flex text-gray-100 items-center">
            <FontAwesomeIcon
              icon={faMedal}
              className="mr-2 text-base text-green-600"
            />
            Streak
          </h2>
          <p className="text-4xl font-bold  text-green-500 mt-2">7 Days</p>
          <p className="text-neutral-400 text-sm mt-1">Keep it going!</p>
        </div>

        <div className=" sm:h-28 h-px sm:w-px w-full rounded-lg bg-neutral-700/70" />

        <div className="flex flex-col w-full justify-center">
          <h2 className="text-lg text-gray-100 items-center">
            <FontAwesomeIcon
              icon={faFire}
              className="mr-2 text-base text-green-600"
            />
            Calories Burned
          </h2>
          <p className="text-4xl font-bold text-green-500 mt-2">3,250</p>
          <p className="text-neutral-400 text-sm mt-1">This week</p>
        </div>
      </div>
    </div>
  );
}
