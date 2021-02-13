import React from 'react';

function LayoutLoading(Component) {
	return function LayoutLoading({ isLoading, ...props }) {
        if (!isLoading) return <Component {...props} />;
		return (
			<p style={{ fontSize: '25px' }}>
				We are waiting for the data to load!...
			</p>
		);
	};
}
export default LayoutLoading;
