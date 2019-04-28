import React, {Component} from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

class NameInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.name);
    this.props.handleName(this.state.name);
  }

  render() {
    return (
      <div id="login">
        <form onSubmit={this.handleSubmit}>
          <FormControl>
            <Input
              name="player_name"
              placeholder="Call me..."
              value={this.state.name}
              onChange={this.handleChange}
            />
            <Button type="submit" color="primary">{this.props.buttonText}</Button>
          </FormControl>
        </form>
      </div>
    )
  }
}

export default NameInput;
