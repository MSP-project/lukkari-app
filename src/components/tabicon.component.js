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
      <Text style={{ color: selected ? '#337ab7' : 'black' }}>{ title }</Text>
    );
  }
}
TabIcon.propTypes = propTypes;

export default TabIcon;
