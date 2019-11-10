import PropTypes from "prop-types";

class Foo {}

/** Component description. */
class MyComponent extends React.Component {
    render() {
        return "";
    }
}

MyComponent.propTypes = {
    children: PropTypes.element.isRequired
};

export default MyComponent;