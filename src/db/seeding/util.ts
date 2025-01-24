import { ExerciseI } from '../../interfaces/models/exerciseI';
import { ProgramI } from '../../interfaces/models/programI';
import { UserI } from '../../interfaces/models/userI';
import { EXERCISE_DIFFICULTY, ROLES } from '../../utils/enums';
import { exercisesNames, programsNames } from './metadata';
import { v4 as uuidv4 } from 'uuid';

export const generateUsers = (
  userFirstNames: string[],
  userLastNames: string[],
  count: number,
): UserI[] => {
  const users: UserI[] = [];

  for (let i = 0; i < count; i++) {
    const name = randomArrayValue(userFirstNames).element;
    const surname = randomArrayValue(userLastNames).element;
    const nickName = surname + randomNumber(1000);
    const password =
      '$2b$10$cvOqJomASQWTzUuUiLLRDu8U8GSvaG/unikuASgLJA.2EFaPXewrW'; // user123
    const email = `${name.toLowerCase()}.${surname.toLowerCase()}${randomNumber(10000)}@gmail.com`;
    const role = randomEnumValue(ROLES);

    const user: UserI = {
      id: uuidv4(),
      name,
      surname,
      nickName,
      password,
      email,
      age: 18 + randomNumber(42),
      role,
    };

    console.log(`-----> ${email};${role}`);

    users.push(user);
  }

  return users;
};

export const generateExercises = (
  exerciseNames: string[],
  programs: ProgramI[],
): ExerciseI[] => {
  const exercises: ExerciseI[] = [];

  if (!exerciseNames.length) {
    throw new Error('No exercise names provided.');
  }

  while (exerciseNames.length !== 0) {
    const { element, index } = randomArrayValue(exerciseNames);

    const exercise: ExerciseI = {
      id: uuidv4(),
      name: element,
      difficulty: randomEnumValue(EXERCISE_DIFFICULTY),
      programId: randomArrayValue(programs).element.id,
    };

    // remove used exercise so there are no two same exercises
    exerciseNames.splice(index, 1);
    exercises.push(exercise);
  }

  return exercises;
};

export const generatePrograms = (programNames: string[]): ProgramI[] => {
  if (!programNames.length) {
    throw new Error('No program names provided.');
  }

  return programNames.map((programName) => ({
    id: uuidv4(),
    name: programName,
  }));
};

export const randomNumber = (range: number): number => {
  return Math.floor(Math.random() * range);
};

export const randomArrayValue = <T>(
  array: T[],
): { element: T; index: number } => {
  const index = randomNumber(array.length);
  const element = array[index];

  return { element, index };
};

export const randomEnumValue = <T>(enumeration: T): T[keyof T] => {
  const values = Object.values(enumeration);
  return values[Math.floor(Math.random() * values.length)];
};
