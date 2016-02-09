import React from 'react-native';

const {
  Text,
  PropTypes } = React;

const propTypes = {
  title: PropTypes.string.isRequired,
};

class TabIcon extends React.Component {
  render() {
    const { selected, title } = this.props;
    return (
      <Text style={{ color: selected ? 'red' : 'black' }}>{ title }</Text>
    );
  }
}
TabIcon.propTypes = propTypes;

export default TabIcon;
