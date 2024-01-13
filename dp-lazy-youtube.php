<?php

/**
 * Plugin Name:       DPlugins Blocks - Youtube LazyLoad
 * Description:       Block that load YouTube video scripts only if user clicks on the play button
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0.3
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

// Include the GitHub updater class
require_once plugin_dir_path( __FILE__ ) . 'github-updater.php';

// Initialize the GitHub updater
$github_updater = new My_GitHub_Update_Checker(
    'dp-lazy-youtube', // Plugin slug
    '1.0.3', // Current plugin version
    'https://api.github.com/repos/your-username/your-repository', // GitHub API URL
    plugin_basename(__FILE__) // Main plugin file
);

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
