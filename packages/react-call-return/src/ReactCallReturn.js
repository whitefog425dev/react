/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import {REACT_CALL_TYPE, REACT_RETURN_TYPE} from 'shared/ReactSymbols';

import type {ReactCall, ReactNodeList, ReactReturn} from 'shared/ReactTypes';

type CallHandler<T> = (props: T, returns: Array<mixed>) => ReactNodeList;

export function unstable_createCall<T>(
  children: mixed,
  handler: CallHandler<T>,
  props: T,
  key: ?string = null,
): ReactCall {
  const call = {
    // This tag allow us to uniquely identify this as a React Call
    $$typeof: REACT_CALL_TYPE,
    key: key == null ? null : '' + key,
    children: children,
    handler: handler,
    props: props,
  };

  if (__DEV__) {
    // TODO: Add _store property for marking this as validated.
    if (Object.freeze) {
      Object.freeze(call.props);
      Object.freeze(call);
    }
  }

  return call;
}

export function unstable_createReturn(value: mixed): ReactReturn {
  const returnNode = {
    // This tag allow us to uniquely identify this as a React Return
    $$typeof: REACT_RETURN_TYPE,
    value: value,
  };

  if (__DEV__) {
    // TODO: Add _store property for marking this as validated.
    if (Object.freeze) {
      Object.freeze(returnNode);
    }
  }

  return returnNode;
}

/**
 * Verifies the object is a call object.
 */
export function unstable_isCall(object: mixed): boolean {
  return (
    typeof object === 'object' &&
    object !== null &&
    object.$$typeof === REACT_CALL_TYPE
  );
}

/**
 * Verifies the object is a return object.
 */
export function unstable_isReturn(object: mixed): boolean {
  return (
    typeof object === 'object' &&
    object !== null &&
    object.$$typeof === REACT_RETURN_TYPE
  );
}

export const unstable_REACT_RETURN_TYPE = REACT_RETURN_TYPE;
export const unstable_REACT_CALL_TYPE = REACT_CALL_TYPE;
