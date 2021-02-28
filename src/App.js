import React from 'react';
import './App.css';
import { NavLink, Switch, Route } from 'react-router-dom';

const App = () => (
    <div className='app'>
        <header>
            <h1>Personal Finance Calculator</h1>
            <Navigation />
        </header>
        <Main />
    </div>
);

const Navigation = () => (
    <nav>
        <ul>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/calculator'>Calculator</NavLink></li>
            <li><NavLink to='/contact'>Contact</NavLink></li>
        </ul>
    </nav>
);

const Home = () => (
    <div className="pageContainer">
        <img src="" alt="intro" />
        <p>Hello! Welcome to this website! Use our personal finance calculator to track your monthly spending and earnings.</p>
    </div>
);

const Contact = () => (
    <div className="pageContainer">
        <p>Hello! We have no contact info!</p>
    </div>
);

class Calculator extends React.Component {
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
            <div className="pageContainer">
            <div className="calculator">
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

const Main = () => (
    <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/calculator' component={Calculator}></Route>
        <Route exact path='/contact' component={Contact}></Route>
    </Switch>
);

export default App;
