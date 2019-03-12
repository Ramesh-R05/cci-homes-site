import { shallow } from 'enzyme';
import React from 'react';

export default function ShallowWrapperFactory(Component, baseProps = {}, baseContext = {}) {
    return (props = {}, context = {}, children = null) => {
        const testProps = {
            ...baseProps,
            ...props,
            children
        };

        const testContext = {
            ...baseContext,
            ...context
        };

        return [shallow(<Component {...props}>{children && children}</Component>, { context: testContext }), testProps, testContext];
    };
}
