import React from 'react';
import PropTypes from 'prop-types';

import app from 'src/app';
import c from './MenuVert2.scss';

/**
 * Menu vertical de segundo nível, filho do menu vertical de primeiro nível.
 */
function MenuVert2(props) {
	return (
		<ul className={c.ul}>
			{props.items.map(item =>
				<li key={item.label} className={c.li}>
					{item.oldLink
						? <a className={c.label} href={app.montaUrlJsf(item.oldLink)}>{item.label}</a>
						: <span className={c.label}>{item.label}</span>
					}
				</li>
			)}
		</ul>
	);
}

MenuVert2.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default MenuVert2;
