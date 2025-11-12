import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { Play, Square, Plus, Minus, Activity } from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/_authenticated/tracker")({
  component: RouteComponent,
});

const exercisesAvailable = [
  { id: 1, name: "Squat" },
  { id: 2, name: "Bench Press" },
  { id: 3, name: "Deadlift" },
];

function RouteComponent() {
  const [sessionStarted, setSessionStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [reps, setReps] = useState(() => {
    const initialReps: Record<number, number> = {};
    exercisesAvailable.forEach((exercise) => {
      initialReps[exercise.id] = 0;
    });
    return initialReps;
  });

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (sessionStarted) {
      timer = setInterval(() => setElapsedTime((t) => t + 1), 1000);
    } else {
      if (timer !== undefined) {
        clearInterval(timer);
      }
      setElapsedTime(0);
    }
    return () => {
      if (timer !== undefined) {
        clearInterval(timer);
      }
    };
  }, [sessionStarted]);

  const handleRepChange = (id: number, change: number) => {
    setReps((prev) => ({
      ...prev,
      [id]: Math.max(0, prev[id] + change),
    }));
  };

  const handleSessionToggle = () => {
    if (sessionStarted) {
      console.log("Session Ended", { reps, duration: elapsedTime });
    } else {
      const resetReps: Record<number, number> = {};
      exercisesAvailable.forEach((exercise) => {
        resetReps[exercise.id] = 0;
      });
      setReps(resetReps);
    }
    setSessionStarted(!sessionStarted);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="flex flex-wrap justify-between gap-4 p-4 text-white">
      <div className="w-full lg:w-2/3 bg-neutral-900 rounded-2xl p-4 border border-neutral-800 flex flex-col items-center justify-center relative overflow-hidden">
        <img
  src="http://localhost:5000/video_feed"
  alt="Live Pose Detection"
  className="rounded-xl border border-neutral-700 w-full absolute"
/>

        <div
          className={`absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-md transition-all duration-400 ${sessionStarted ? "bg-green-500/70" : "bg-neutral-700/70"}`}
        >
          <Activity className="size-4" />
          <span className="text-sm font-medium tracking-wide">
            {sessionStarted ? "LIVE" : "OFFLINE"}
          </span>
        </div>

        {!sessionStarted && (
          <p className="text-neutral-400 text-lg">
            Start a session to begin tracking.
          </p>
        )}

        <div
          className={`absolute top-4 right-4 bg-green-600/80 px-3 py-1 rounded-md text-neutral-200 text-sm ${sessionStarted ? "opacity-100" : "opacity-0"} transition-all duration-300`}
        >
          Duration: {formatTime(elapsedTime)}
        </div>
      </div>

      <div className="w-full lg:w-[32%] flex flex-col border border-neutral-800 backdrop-blur-md p-5 gap-4 rounded-2xl bg-neutral-900/80 shadow-lg">
        <Button
          onClick={handleSessionToggle}
          className={`w-full flex items-center justify-center gap-2 font-medium text-white transition-all duration-300 ${
            sessionStarted
              ? "bg-gradient-to-r from-red-600 to-red-500 hover:opacity-90"
              : "bg-gradient-to-r from-green-600 to-green-500 hover:opacity-90"
          }`}
        >
          {sessionStarted ? (
            <>
              <Square className="size-4" />
              Stop Session
            </>
          ) : (
            <>
              <Play className="size-4" />
              Start Session
            </>
          )}
        </Button>

        <div className="overflow-y-auto max-h-[60vh] space-y-3 pr-1 custom-scrollbar">
          {exercisesAvailable.map((exercise) => (
            <div
              key={exercise.id}
              className="border border-neutral-700 bg-neutral-800/80 backdrop-blur-md rounded-lg p-4 flex justify-between items-center hover:bg-neutral-700/60 transition-all duration-200"
            >
              <div>
                <h2 className="text-green-400 font-semibold text-lg">
                  {exercise.name}
                </h2>
                <p className="text-sm text-neutral-300">
                  Reps: {reps[exercise.id]}
                </p>
              </div>

              {sessionStarted && (
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-neutral-700/50 hover:bg-neutral-600"
                    onClick={() => handleRepChange(exercise.id, -1)}
                  >
                    <Minus className="size-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-neutral-700/50 hover:bg-neutral-600"
                    onClick={() => handleRepChange(exercise.id, 1)}
                  >
                    <Plus className="size-3" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RouteComponent;
