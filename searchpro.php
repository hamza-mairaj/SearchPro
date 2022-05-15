<?php
/**
 * Plugin Name:         SearchPro
 * Description:         Live search using shortcode [searchpro]
 * Version:             1.0
 * Requires at least:   5.2
 * Requires PHP:        7.2
 * Author:              Hamza Mairaj
 * Author URI:          https://hamzamairaj.dev/
 * License:             GPL v2 or later
 * License URI:         https://www.gnu.org/licenses/gpl-2.0.html
 */

if (!defined('ABSPATH')) {
    exit();
}

define('SP_PATH', plugin_dir_path(__FILE__));
define('SP_URL', plugin_dir_url(__FILE__));

if (!is_admin()) {
    require SP_PATH . 'public/class-searchpro.php';
    require SP_PATH . 'inc/class-searchresult.php';
}
