import $api from '../http';
import {AxiosResponse} from "axios";
import {IActivity} from "../models/IActivity";

export default class ActivityService {
    static async getAllActivities() : Promise<AxiosResponse<IActivity[]>> {
        return $api.get<IActivity[]>('/api/activities')
    }

    static async createActivity(
      title: string,
      description: string,
      minAge: number,
      maxAge: number,
      chosenSkills: string[]
    ) : Promise<AxiosResponse<IActivity[]>> {
      return $api.post<IActivity[]>('/api/activities')
    }
}
