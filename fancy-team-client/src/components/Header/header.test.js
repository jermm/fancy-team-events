import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header';

import { shallow } from 'enzyme';

it('Header renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Header />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Using shadown - should render correctly with no props', () => {
    const component = shallow(<Header />);
    expect(component).toMatchSnapshot();
  });
