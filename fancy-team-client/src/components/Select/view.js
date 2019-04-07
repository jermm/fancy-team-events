import React, {Component} from 'react';


class SelectBox extends React.Component {
    constructor(props) {
        super(props);

    }
    onChange(e) {
        this.props.onSelect(e.target.value);

    }
    render() {
        return (
            <div className="form-group">
                <select value={this.props.value} onChange={this.onChange.bind(this)} className="form-control">
                    {this.props.options.map(option => {
                        return <option value={option} key={option} >{option}</option>
                    })}
                </select>
            </div>

        )
    }
}

export default SelectBox;
