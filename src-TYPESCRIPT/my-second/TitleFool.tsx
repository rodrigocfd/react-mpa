import React from 'react';

interface Props {
	name: string | null;
}

function TitleFoo({name}: Props) {
	return (
		<h1>{name}, fool!</h1>
	);
}

export default TitleFoo;
