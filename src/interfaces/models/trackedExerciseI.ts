export interface TrackedExerciseI {
  id?: string;
  userId: string;
  exerciseId: string;
  duration: number;
  startDate: Date;
  endDate: Date;
}
