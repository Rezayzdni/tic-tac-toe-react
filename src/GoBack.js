import React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';


class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reverseOrder: false,
        };
    }

    render() {
        const order = this.state.reverseOrder ? "reverseOrder" : "";
        const historyList = !!this.props.history[1];

        const moves = this.props.history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Reset Game';
            const location = step.col ? "(" + step.col + "," + step.row + ")" : "";
            if (!historyList) return "";
            return (
                <li key={move}>
                    <Button variant="outlined" color="secondary" onClick={() => this.jumpTo(move)}>{desc}</Button> {location}
                </li>
            )
        })

        return (
            <>  
                <ul className={order}>{moves}</ul>
            </>
        );
    }

    jumpTo(step) {
        this.props.dispatch({ type: "SET_STEP", payload: step });
    }
}

const mapStateToProps = (state) => { return { history: state.history } };
export default connect(mapStateToProps)(History);