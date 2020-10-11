import React from "react";
import Paragraph from "./Paragraph";
import Calculation from "../logic/calculation";

export default class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            content: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let value = event.target.value;

        this.setState({value: value});
    }

    handleSubmit(event) {
        event.preventDefault();

        let content = 'Wrong input!';

        let result = new Calculation(this.state.value).calculate();
        if (result !== false) {

            content = '';
            let expression = new Calculation(this.state.value).verifyInput(),
                len = expression.length;

            for (let i = 0; i < len; i++) {
                content += expression[i] + ' ';
            }
            content += '= ';
            content += result;
        }
        this.setState({content: content});

    }

    render() {
        return (
            <div>
                <div className="row">
                    <h1 className="col-md-8 col-md-offset-2 text-center">React calculator</h1>
                </div>

                <div className="container">
                    <div className="row">
                        <form className="col-md-6 col-md-offset-3 text-center" onSubmit={this.handleSubmit}>
                            <input type="text" className="form-control col-md-9" placeholder="expression..."
                                   onChange={this.handleChange}/>
                            <input className="btn btn-success" type="submit" value="Submit"/>
                        </form>
                    </div>

                    <Paragraph content={this.state.content}/>
                </div>
            </div>
        )
    }
}
