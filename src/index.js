import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Frame extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recentValue: '',
            expenses: Array(100).fill(null),
            total: 0
        };
        this.addExpense = this.addExpense.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    addExpense(event){
        this.setState({
            recentValue: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const tempExpenses = this.state.expenses.slice();
        const input = this.state.recentValue;
        const newTotal = this.state.total + parseFloat(input, 10);
        this.setState({
            expenses: tempExpenses.concat(input),
            total: newTotal,
            recentValue: ''
        });
    }

    render() {
        return (
            <div className="container">
                <h1>Personal Finance Calculator</h1>
                <form className='submission' onSubmit={this.handleSubmit}>
                    <label>Enter your expenses:
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value = {this.state.recentValue}
                            onChange={this.addExpense}
                        />
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
                <div className='displayTotal'>
                Total: {(this.state.total).toFixed(2)}
                </div>
            </div>
        );
    }
}

//======

ReactDOM.render(
    <Frame />,
    document.getElementById('root')
);
