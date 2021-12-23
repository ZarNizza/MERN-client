import React, { Component } from "react";
import { useParams } from "react-router-dom";
// This will require to npm install axios
import axios from "axios";
// import { withRouter } from "react-router-dom";

class EditClass extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);
    console.log("ConstructorProps= ", props);
    this.id = props.id;
    this.onChangePersonName = this.onChangePersonName.bind(this);
    this.onChangePersonPosition = this.onChangePersonPosition.bind(this);
    this.onChangePersonLevel = this.onChangePersonLevel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      person_name: "",
      person_position: "",
      person_level: "",
      records: [],
    };
  }
  // This will get the record based on the id from the database.
  componentDidMount() {
    console.log("this.id= ", this.id, " this= ", this);
    axios
      .get("http://localhost:5000/record/" + this.id)
      .then((response) => {
        console.log("DidMountResponse=", response);
        this.setState({
          person_name: response.data.person_name,
          person_position: response.data.person_position,
          person_level: response.data.person_level,
        });
      })
      .catch(function (error) {
        console.log("DidMount Error= ", error);
      });
  }

  // These methods will update the state properties.
  onChangePersonName(e) {
    this.setState({
      person_name: e.target.value,
    });
  }

  onChangePersonPosition(e) {
    this.setState({
      person_position: e.target.value,
    });
  }

  onChangePersonLevel(e) {
    this.setState({
      person_level: e.target.value,
    });
  }

  // This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();
    const newEditedperson = {
      person_name: this.state.person_name,
      person_position: this.state.person_position,
      person_level: this.state.person_level,
    };
    console.log(newEditedperson);

    // This will send a post request to update the data in the database.
    axios
      .post("http://localhost:5000/update/" + this.id, newEditedperson)
      .then((res) => console.log(res.data));

    // this.props.history.push("/");
  }

  // This following section will display the update-form that takes the input from the user to update the data.
  render() {
    return (
      <div>
        <h3 align="center">Update Record</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Person's Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.person_name}
              onChange={this.onChangePersonName}
            />
          </div>
          <div className="form-group">
            <label>Position: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.person_position}
              onChange={this.onChangePersonPosition}
            />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityLow"
                value="Intern"
                checked={this.state.person_level === "Intern"}
                onChange={this.onChangePersonLevel}
              />
              <label className="form-check-label">Intern</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityMedium"
                value="Junior"
                checked={this.state.person_level === "Junior"}
                onChange={this.onChangePersonLevel}
              />
              <label className="form-check-label">Junior</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityHigh"
                value="Senior"
                checked={this.state.person_level === "Senior"}
                onChange={this.onChangePersonLevel}
              />
              <label className="form-check-label">Senior</label>
            </div>
          </div>
          <br />

          <div className="form-group">
            <input
              type="submit"
              value="Update Record"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default function Edit() {
  const props = useParams();
  console.log("useParamsProps=", props);
  const editItem = new EditClass(props);
  return editItem;
}

// You can get access to the history object's properties and the closest <Route>'s match via the withRouter
// higher-order component. This makes it easier for us to edit our records.
// export default withRouter(Edit);
