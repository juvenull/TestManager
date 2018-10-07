import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as ProjectListState from '../store/ProjectList';

// At runtime, Redux will merge together...
type ProjectListProps =
    ProjectListState.ProjectListState        // ... state we've requested from the Redux store
    & typeof ProjectListState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class ProjectList extends React.Component<ProjectListProps, {}> {
    componentWillMount() {
        // This method runs when the component is first added to the page
        this.props.requestProjects();
    }

    public render() {
        return <div>
            <h1>Список проектов</h1>
            <p>Описание категории.</p>
            <ul className="list-group">
                {this.props.isLoading ? <span>Loading...</span> :
                    this.props.projects.map(project =>
                        <li key={project.Id} className="list-group-item">
                            <div className="media">
                                <div className="media-left">
                                    <Link to={`/projects/${project.Id}`}>
                                        <img className="media-object" src={project.AvatarUrl || "https://secure.gravatar.com/avatar/05ebfba28ce24c721cbc6c3cf78662dd?s=46&d=identicon"} />
                                    </Link>
                                </div>
                                <div className="media-body">
                                    <Link to={`/projects/${project.Id}`}>
                                        <h4 className="media-heading">{project.Name}</h4>
                                    </Link>
                                    {project.Description || " "}
                                </div>
                            </div>
                        </li>
                    )
                }
            </ul>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => state.projects, // Selects which state properties are merged into the component's props
    ProjectListState.actionCreators                 // Selects which action creators are merged into the component's props
)(ProjectList) as typeof ProjectList;