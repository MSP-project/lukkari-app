import React from 'react-native';

import Counter from '../components/counter.component';

class AppView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Counter/>
    );
  }
}

export default AppView;
