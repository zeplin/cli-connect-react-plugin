/* eslint-disable @typescript-eslint/explicit-function-return-type */
import PropTypes from "prop-types";

class Foo {}

class MyComponent extends React.Component {
    render() {
        return "";
    }
}

MyComponent.propTypes = {
    // You can declare that a prop is a specific JS type. By default, these
    // Are all optional.
    optionalArray: PropTypes.array,
    optionalBool: PropTypes.bool,
    optionalFunc: PropTypes.func,
    optionalNumber: PropTypes.number,
    optionalObject: PropTypes.object,
    optionalString: PropTypes.string,
    optionalSymbol: PropTypes.symbol,

    // Anything that can be rendered: numbers, strings, elements or an array
    // (or fragment) containing these types.
    optionalNode: PropTypes.node,

    // A React element.
    optionalElement: PropTypes.element,

    // A React element type (ie. MyComponent).
    optionalElementType: PropTypes.elementType,

    // You can also declare that a prop is an instance of a class. This uses
    // JS's instanceof operator.
    optionalFoo: PropTypes.instanceOf(Foo),

    // You can ensure that your prop is limited to specific values by treating
    // It as an enum.
    optionalEnum: PropTypes.oneOf(["News", "Photos"]),

    // An object that could be one of many types
    optionalUnion: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Foo)
    ]),

    // An array of a certain type
    optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

    // An object with property values of a certain type
    optionalObjectOf: PropTypes.objectOf(PropTypes.number),

    // An object taking on a particular shape
    optionalObjectWithShape: PropTypes.shape({
        color: PropTypes.string,
        fontSize: PropTypes.number
    }),

    // An object with warnings on extra properties
    optionalObjectWithStrictShape: PropTypes.exact({
        name: PropTypes.string,
        quantity: PropTypes.number
    }),

    // You can chain any of the above with `isRequired` to make sure a warning
    // Is shown if the prop isn't provided.
    requiredFunc: PropTypes.func.isRequired,

    // A value of any data type
    requiredAny: PropTypes.any.isRequired,

    // You can also specify a custom validator. It should return an Error
    // Object if the validation fails. Don't `console.warn` or throw, as this
    // Won't work inside `oneOfType`.
    customProp: (props, propName, componentName) => {
        if (!/matchme/.test(props[propName])) {
            return new Error(`Invalid prop \`${propName}\` supplied to` +
        ` \`${componentName}\`. Validation failed.`);
        }
    },

    // You can also supply a custom validator to `arrayOf` and `objectOf`.
    // It should return an Error object if the validation fails. The validator
    // Will be called for each key in the array or object. The first two
    // Arguments of the validator are the array or object itself, and the
    // Current item's key.
    // eslint-disable-next-line max-params
    customArrayProp: PropTypes.arrayOf((propValue, key, componentName, location, propFullName) => {
        if (!/matchme/.test(propValue[key])) {
            return new Error(
                `Invalid prop \`${propFullName}\` supplied to \`${componentName}\`. Validation failed.`
            );
        }
    })
};

export default MyComponent;