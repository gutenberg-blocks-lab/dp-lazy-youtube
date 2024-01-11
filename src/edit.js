// Edit.js

import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit() {
	return (
		<p { ...useBlockProps() }>
			{ __(
				'Dp Lazy Youtube – hello from the editor!',
				'dp-lazy-youtube'
			) }
		</p>
	);
}
