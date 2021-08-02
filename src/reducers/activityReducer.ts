import {FETCH_ACTIVITIES, FETCH_ACTIVITIES_ERROR, FETCH_ACTIVITIES_SUCCESS} from '../constants'

interface ActivityState {
  activities: any[],
  loading: boolean,
  error: null | boolean
}

interface ActivityAction {
  type: string;
  payload?: any;
}

export const initialState : ActivityState = {
  activities: [],
  loading: false,
  error: null
};


export const activityReducer = (state = initialState, action) : ActivityState => {
  switch(action.type) {
    case FETCH_ACTIVITIES:
      return {loading: true, error: null, activities: []}
    default:
      return state;
  }
}
