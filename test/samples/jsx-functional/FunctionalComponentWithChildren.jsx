import React from 'react';

const MyComponent = () => {
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

MyComponent.propTypes = {
  children: PropTypes.element.isRequired
};

export default MyComponent;
