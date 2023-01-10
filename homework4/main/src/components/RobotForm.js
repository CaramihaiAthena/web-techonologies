import React from "react";
import { Component} from "react";

class RobotForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            type : new String(),
            name : new String(),
			mass : new String()
        }
        this.handleChange = (event) => {
            this.setState({
            [event.target.name] : event.target.value
            })
        }
    }
    render(){
        return <div>
            Name:<input id="name" name="name" onChange={this.handleChange} />
            Type:<input id="type" name="type" onChange={this.handleChange} />     
            Mass:<input id="mass" name="mass" onChange={this.handleChange} />
            <input type="button"  value="add" onClick={() => this.props.onAdd({
              type : this.state.type,
              name : this.state.name,
              mass : this.state.mass,
            })} />
        </div>
    }
}

export default RobotForm;