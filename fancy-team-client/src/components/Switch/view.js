import React, {Component} from 'react';
import './switch.scss';

class Switch extends Component {

    constructor ( props ) {
        super( props );


        this.state = {
            isChecked: null
        }

        this._handleChange = this._handleChange.bind(this);
    }

    // componentWillMount () {
    //     this.setState( { isChecked: this.props.isChecked } );
    // }


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
        this.setState( { isChecked: !this.state.isChecked } );
        this.props.onToggle(!this.state.isChecked);
    }

}

export default Switch;

// React.render( <Switch isChecked={ true } />, document.getElementById( "page" ) );
