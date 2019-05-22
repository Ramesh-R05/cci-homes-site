import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function WithLoadMore(WrappedComponent) {
    return class WithLoadMoreHOC extends Component {
        static displayName = `${WrappedComponent.displayName}LoadMoreWrapper`;

        static propTypes = {
            listNextParams: PropTypes.shape({
                pageNo: PropTypes.number
            }).isRequired
        };

        shouldComponentUpdate(nextProps) {
            const { listNextParams } = this.props;
            const { listNextParams: updatedParams } = nextProps;

            if (!updatedParams || !listNextParams) {
                return false;
            }

            return listNextParams.pageNo !== updatedParams.pageNo;
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
}
