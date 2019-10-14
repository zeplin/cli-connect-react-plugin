import PropTypes from 'prop-types';

/** Some description */
class SinglePropertyComponent extends React.Component {
  render() {
    const children = this.props.children;
    return (
      <div>
        {children}
      </div>
    );
  }
}

SinglePropertyComponent.propTypes = {
  children: PropTypes.element.isRequired
};

export default SinglePropertyComponent;