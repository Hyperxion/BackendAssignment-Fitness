import { ROLES } from '../../utils/enums';

export interface UserI {
  id?: string;
  name: string;
  surname: string;
  nickName: string;
  email: string;
  age: number;
  role: ROLES;
}
