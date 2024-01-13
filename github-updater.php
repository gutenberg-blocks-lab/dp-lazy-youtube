<?php
// github-updater.php

class My_GitHub_Update_Checker {
    private $slug; // Plugin slug
    private $current_version; // Current version of your plugin
    private $api_url; // API URL for GitHub repository
    private $plugin_file; // Main plugin file path

    public function __construct($slug, $current_version, $api_url, $plugin_file) {
        $this->slug = $slug;
        $this->current_version = $current_version;
        $this->api_url = $api_url;
        $this->plugin_file = $plugin_file;

        add_filter('pre_set_site_transient_update_plugins', [$this, 'check_for_update']);
    }

    public function check_for_update($transient) {
        if (empty($transient->checked)) {
            return $transient;
        }

        $remote_version_info = $this->get_remote_version_info();

        if (!$remote_version_info) {
            return $transient;
        }

        if (version_compare($this->current_version, $remote_version_info->tag_name, '<')) {
            $obj = new stdClass();
            $obj->slug = $this->slug;
            $obj->new_version = $remote_version_info->tag_name;
            $obj->url = $remote_version_info->html_url;
            $obj->package = $remote_version_info->zipball_url;

            $transient->response[$this->plugin_file] = $obj;
        }

        return $transient;
    }

    private function get_remote_version_info() {
        $response = wp_remote_get($this->api_url . '/releases/latest');
        if (is_wp_error($response)) {
            return false;
        }

        $response_body = wp_remote_retrieve_body($response);
        return json_decode($response_body);
    }
}

// End of github-updater.php
