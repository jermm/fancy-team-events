import React, {Component} from 'react';
import './switch.scss';

class Switch extends Component {

    constructor ( props ) {
        super( props );

        this._handleChange = this._handleChange.bind(this);
    }

    render () {

        return(
            <div className="switch-container">
                <label>
                    <input ref="switch" checked={ this.props.isChecked } onChange={ this._handleChange } className="switch" type="checkbox" />
                    <div>

                        <div></div>
                    </div>
                </label>
            </div>
        );
    }


    _handleChange () {
        this.props.onToggle(!this.props.isChecked);
    }

}

export default Switch;

