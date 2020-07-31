import React from 'react';

import c from './Modal.scss';

interface Props {
	texto: string,
	onClose: () => void,
}

function Modal(props: Props) {
	const [outraModalAberta, setOutraModalAberta] = React.useState(false);

	return (
		<div className={c.modal}>
			<h1>{props.texto}</h1>
			<div><button onClick={props.onClose}>Fechar</button></div>
			<div><button onClick={() => setOutraModalAberta(true)}>Outra modal</button></div>
			{outraModalAberta &&
				<Modal texto="Segunda" onClose={() => setOutraModalAberta(false)} />
			}
		</div>
	);
}

export default Modal;
