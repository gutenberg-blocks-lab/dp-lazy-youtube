<?php

/**
 * Plugin Name:       DPlugins Blocks - Youtube LazyLoad
 * Description:       Block that load YouTube video scripts only if user clicks on the play button
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0.8
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
 * For plugin to work on multiple installs replace 'UNIQUE_PLUGIN_NAME'
 * Update plugin _VER on the line 32
 * Update plugin _REMOTE_URL on the line 34
 */
$plugin_prefix = 'DPLAZYYOUTUBEBLOCK';

define($plugin_prefix . '_DIR', plugin_basename(__DIR__));
define($plugin_prefix . '_BASE', plugin_basename(__FILE__));
define($plugin_prefix . '_PATH', plugin_dir_path(__FILE__));
define($plugin_prefix . '_VER', '1.0.8');
define($plugin_prefix . '_CACHE_KEY', 'dpyoutubeblock-cache-key-for-plugin');
define($plugin_prefix . '_REMOTE_URL', 'https://selfhost.dplugins.com/wp-content/uploads/plugins/13/info.json');

require constant($plugin_prefix . '_PATH') . 'inc/update.php';

new DPUpdateChecker(
	constant($plugin_prefix . '_DIR'),
	constant($plugin_prefix . '_VER'),
	constant($plugin_prefix . '_CACHE_KEY'),
	constant($plugin_prefix . '_REMOTE_URL'),
	constant($plugin_prefix . '_BASE')
);

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function dp_lazy_youtube_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'dp_lazy_youtube_init' );