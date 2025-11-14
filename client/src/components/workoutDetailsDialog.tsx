import type { Workout } from "@/types/workout";

const WorkoutDetailsDialog = ({ exercise }: { exercise: Workout }) => {
  return (
    <div className="flex flex-col gap-4 p-4 ">
      <h1 className="font-bold text-green-500 text-xl">{exercise.name}</h1>
      <img
        src={exercise.image}
        alt={exercise.name}
        className="aspect-video object-cover rounded-lg"
      />
      <div className="space-y-3">
        <p className="text-neutral-300 break-auto">{exercise.description}</p>
        <div className="grid grid-cols-3 gap-4">
          {exercise.sets!==0 && (
            <h3 className="flex items-center font-medium text-neutral-200">
              Sets: {exercise.sets}
            </h3>
          )}
          {exercise.reps && (
            <h3 className="flex items-center font-medium text-neutral-200">
              Reps: {exercise.reps}
            </h3>
          )}
          {exercise.time && (
            <h3 className="flex items-center font-medium text-neutral-200">
              Time: {exercise.time}
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetailsDialog;
