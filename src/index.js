import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Frame extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recentValue: '',
            expenses: [],
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
                    <h3>Enter your expenses</h3>
                    <label>Expense:
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
                    <li>Total:</li>
                    <li> {'$' + (this.state.total).toFixed(2)}</li>
                </div>
                <div>
                    <h3>Expense History</h3>
                    <DisplayReactList
                        value={this.state.expenses}
                    />
                </div>
            </div>
        );
    }
}

function DisplayReactList(props) {
    const expenses = props.value;
    const listExpenses = expenses.map((expense) =>
        <li key={expense}>
            {'$' + parseFloat(expense, 10).toFixed(2)}
        </li>
    );

    return (
        <ul>{listExpenses}</ul>
    );
}

//======

ReactDOM.render(
    <Frame />,
    document.getElementById('root')
);
