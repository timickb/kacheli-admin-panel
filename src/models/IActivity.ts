import {IActivitySkill} from "./IActivitySkill";

export interface IActivity {
    id: string;
    dateAdded: string;
    title: string;
    description: string;
    maxAge: number;
    minAge: number;
    status: boolean;
    skills: IActivitySkill[]
}
