import { EXERCISE_DIFFICULTY } from '../../utils/enums';
export interface ExerciseI {
  id?: string;
  difficulty: EXERCISE_DIFFICULTY;
  name: string;
  programId?: string;
}
