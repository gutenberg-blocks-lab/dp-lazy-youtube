<?php

/**
 * Plugin Name:       DPlugins Blocks - Youtube LazyLoad
 * Description:       Block that load YouTube video scripts only if user clicks on the play button
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0.6
 * Author:            Marko Krstić
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       dp-lazy-youtube
 * Website:           https://www.dplugins.com
 *
 * @package           create-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function dp_block_lazy_youtube() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'dp_block_lazy_youtube' );
