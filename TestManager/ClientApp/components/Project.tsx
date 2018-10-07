import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as ProjectState from '../store/Project';

// At runtime, Redux will merge together...
type ProjectProps =
    ProjectState.ProjectState        // ... state we've requested from the Redux store
    & typeof ProjectState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ id: string }>; // ... plus incoming routing parameters

class Project extends React.Component<ProjectProps, {}> {
    componentWillMount() {
        // This method runs when the component is first added to the page
        let id = parseInt(this.props.match.params.id);
        this.props.requestProject(id);
    }
    public render() {
        return <div>
            <h1>Текущий проект {this.props.match.params.id}</h1>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => state.project, // Selects which state properties are merged into the component's props
    ProjectState.actionCreators                 // Selects which action creators are merged into the component's props
)(Project) as typeof Project;