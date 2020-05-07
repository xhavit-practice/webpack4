import React from 'react';
import './Counter.scss';

export default class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const { count } = this.state;
        document.title = `You clicked ${count} times`;
    }

    componentDidUpdate() {
        const { count } = this.state;
        document.title = `You clicked ${count} times`;
    }

    handleClick() {
        this.setState((state) => ({
            count: state.count + 1,
        }));
    }

    render() {
        const { count } = this.state;

        return (
            <div className="counter">
                <p>You clicked {count} times</p>
                <button type="button" onClick={this.handleClick}>
                    Click me
                </button>
            </div>
        );
    }
}
