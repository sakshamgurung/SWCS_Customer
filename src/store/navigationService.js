import * as React from 'react';

export const navigationRef = React.createRef();

let navigation = navigationRef;

export const navigate = (name, params) => {
  navigation.current?.navigate(name, params);
  // navigation.dispatch(
  //   NavigationActions.navigate({
  //     name,
  //     params,
  //   }),
  // );
};
