<?php

class searchPro {
    function __construct() {
        add_action('wp_enqueue_scripts', [$this, 'search_scripts']);
        add_shortcode('searchpro', [$this, 'searchpro_shorcode']);
    }

    function search_scripts() {
        wp_register_style('sp-style', SP_URL . 'public/assets/css/style.css');
        wp_register_script('sp-script', SP_URL . 'public/assets/js/sp-script.js', array('jquery'));
    }

    function searchpro_shorcode() {
        wp_enqueue_style('sp-style');
        wp_enqueue_script('sp-script');
        ob_start();
        ?>
        <div class="searchPro">
            <form action="" method="post">
                <label for="search_query" class="sp-lable">
                    <div class="sp-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 20 20" fill="none">
                    <path d="M19 19L13 13L19 19ZM15 8C15 8.91925 14.8189 9.82951 14.4672 10.6788C14.1154 11.5281 13.5998 12.2997 12.9497 12.9497C12.2997 13.5998 11.5281 14.1154 10.6788 14.4672C9.82951 14.8189 8.91925 15 8 15C7.08075 15 6.1705 14.8189 5.32122 14.4672C4.47194 14.1154 3.70026 13.5998 3.05025 12.9497C2.40024 12.2997 1.88463 11.5281 1.53284 10.6788C1.18106 9.82951 1 8.91925 1 8C1 6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637 1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    </div>
                    <input type="search" name="search_query" placeholder="Type here..." id="search_query">
                </label>
                <ul class="sp-search-results" style="display:none"></ul>
            </form>
        </div>
        <?php
        return ob_get_clean();
    } 
}
new searchPro();