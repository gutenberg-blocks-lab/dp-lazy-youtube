import { useBlockProps } from '@wordpress/block-editor';

export default function save() {
	return (
		<p { ...useBlockProps.save() }>
			{ 'Dp Init – hello from the saved content!' }
		</p>
	);
}
