import React from 'react';
import PropTypes from 'prop-types';

import app from 'src/app';
import MenuVert2 from './MenuVert2';
import c from './MenuVert1Entry.scss';

MenuVert1Entry.propTypes = {
	label: PropTypes.string.isRequired,
	oldLink: PropTypes.string,
	menuVert2: PropTypes.arrayOf(PropTypes.object)
};

/**
 * Um único item de menu, do menu vertical de primeiro nível.
 */
function MenuVert1Entry(props) {
	return (
		<li className={c.li}>
			<div className={c.flexWrap}>
				{props.oldLink
					? <a className={c.label} href={app.montaUrlJsf(props.oldLink)}>{props.label}</a>
					: <span className={c.label}>{props.label}</span>
				}
				{props.menuVert2 &&
					<div className={c.arrow}>►</div>
				}
			</div>
			{props.menuVert2 &&
				<MenuVert2 items={props.menuVert2} />
			}
		</li>
	);
}

export default MenuVert1Entry;
