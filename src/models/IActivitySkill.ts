import {ICategory} from "./ICategory";

export interface IActivitySkill {
  id: string;
  title: string;
  status: boolean;
  category: ICategory;
  offset: number;
}
