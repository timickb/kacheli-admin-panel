import {IConnectedSkill} from "./IConnectedSkill";

export interface ICreateActivity {
  title: string;
  description: string;
  minAge: number;
  maxAge: number;
  status: boolean;
  connectedSkills: IConnectedSkill[];
}
