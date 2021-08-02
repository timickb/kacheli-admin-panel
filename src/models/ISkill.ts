import {ICategory} from "./ICategory";

export interface ISkill {
  id: string;
  dateAdded: string;
  title: string;
  status: boolean;
  category: ICategory[];
}
