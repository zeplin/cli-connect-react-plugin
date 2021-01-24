import React from 'react';

/** Component 1 description. Only this one should be shown */
const MyComponent1 = () => {
  const thing = {
    stuff: 'stuff',
  };

  const string = thing?.stuff;

  return (
    <div>
      {string}
    </div>
  );
};

MyComponent1.propTypes = {
  children: PropTypes.element.isRequired
};

/** Component 2 description. This one should not be shown */
const MyComponent2 = () => {
  const thing = {
    stuff: 'stuff',
  };

  const string = thing?.stuff;

  return (
    <div>
      {string}
    </div>
  );
};

MyComponent2.propTypes = {
  children: PropTypes.element.isRequired,
  someParameter: PropTypes.string.isRequired
};

export const MyComponent = MyComponent1;
export const MyOtherComponent = MyComponent2;
