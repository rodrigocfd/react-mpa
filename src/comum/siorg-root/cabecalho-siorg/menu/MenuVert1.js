import React from 'react';
import PropTypes from 'prop-types';

import MenuVert1Entry from './MenuVert1Entry';
import c from './MenuVert1.scss';

MenuVert1.propTypes = {
	label: PropTypes.string.isRequired,
	menuVert1: PropTypes.arrayOf(PropTypes.object).isRequired
};

/**
 * Menu vertical de primeiro nível, filho do menu horizontal principal.
 */
function MenuVert1(props) {
	return (
		<ul className={c.ul}>
			<li className={c.liTitle}>
				<span className={c.spanTitle}>{props.label}</span>
			</li>
			{props.menuVert1.map(item =>
				<MenuVert1Entry key={item.label} {...item} />
			)}
		</ul>
	);
}

export default MenuVert1;
