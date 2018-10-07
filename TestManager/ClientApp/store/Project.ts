import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface ProjectState {
    isLoading: boolean;
    Id: number;
    Name: string;
    Description: string;
    AvatarUrl: string;
    Plans: Plan[];
}

export interface Project {
    Id: number;
    Name: string;
    Description: string;
    AvatarUrl: string;
}

export interface Plan {
    Id: number;
    Name: string;
    Description: string;
    DateCreated: Date;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestProjectAction {
    type: 'REQUEST_PROJECT';
}

interface ReceiveProjectAction {
    type: 'RECEIVE_PROJECT';
    project: Project;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestProjectAction | ReceiveProjectAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestProject: (id: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        if (id !== getState().project.Id) {
            let fetchTask = fetch(`api/Projects/?id=${id}`)
                .then(response => response.json() as Promise<Project>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_PROJECT', project: data });
                });
            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'REQUEST_PROJECT' });
        }

    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: ProjectState = {
    isLoading: false,
    Id: 0,
    Name: "",
    Description: "",
    AvatarUrl: "",
    Plans: []
};

export const reducer: Reducer<ProjectState> = (state: ProjectState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_PROJECT':
            return {
                //project: state.project,
                isLoading: true,
                Id: state.Id,
                Name: state.Name,
                Description: state.Description,
                AvatarUrl: state.AvatarUrl,
                Plans: state.Plans
            };
        case 'RECEIVE_PROJECT':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            return {
                isLoading: false,
                Id: state.Id,
                Name: state.Name,
                Description: state.Description,
                AvatarUrl: state.AvatarUrl,
                Plans: state.Plans
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};