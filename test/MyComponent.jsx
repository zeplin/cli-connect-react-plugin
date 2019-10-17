import PropTypes from "prop-types";

class Foo {}

class MyComponent extends React.Component {
    render() {
        return "";
    }
}
// All examples of propTypes listed official documentation
MyComponent.propTypes = {
    optionalArray: PropTypes.array,
    optionalBool: PropTypes.bool,
    optionalFunc: PropTypes.func,
    optionalNumber: PropTypes.number,
    optionalObject: PropTypes.object,
    optionalString: PropTypes.string,
    optionalSymbol: PropTypes.symbol,
    optionalNode: PropTypes.node,
    optionalElement: PropTypes.element,
    optionalElementType: PropTypes.elementType,
    optionalFoo: PropTypes.instanceOf(Foo),
    optionalEnum: PropTypes.oneOf(["News", "Photos"]),
    optionalUnion: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Foo)
    ]),
    optionalArrayOf: PropTypes.arrayOf(PropTypes.number),
    optionalObjectOf: PropTypes.objectOf(PropTypes.number),
    optionalObjectWithShape: PropTypes.shape({
        color: PropTypes.string,
        fontSize: PropTypes.number
    }),
    optionalObjectWithStrictShape: PropTypes.exact({
        name: PropTypes.string,
        quantity: PropTypes.number
    }),
    requiredFunc: PropTypes.func.isRequired,
    requiredAny: PropTypes.any.isRequired,
    customProp: () => {},
    customArrayProp: PropTypes.arrayOf(() => {}),
    customObjectOfProp: PropTypes.objectOf(() => {})
};

export default MyComponent;