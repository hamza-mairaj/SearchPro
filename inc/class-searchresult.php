<?php

class spSearchResult {
    function __construct() {
        add_action('rest_api_init', [$this, 'register_rout']);
    }

    function register_rout() {
        register_rest_route( 'searchpro/v1', '/query', array(
            'methods' => 'POST',
            'callback' => [$this, 'routecallback'],
          ) );
    }

    function routecallback(WP_REST_Request $data) {
        $query = sanitize_text_field(trim($data->get_param( 'query' )));
        $query_args = array( 's' => $query );
        $query = new WP_Query( $query_args );
        $posts = $query->posts;
        $i = 0;

        foreach ($posts as $key => $post) {
            $post = (array) $post;
            $matched = '<span class="matched">'.esc_html($data->get_param( 'query' )).'</span>';
            $post['post_title'] = str_ireplace($data->get_param( 'query' ), $matched, $post['post_title']);
            if ($post['post_type'] == 'product') {
                global $woocommerce;
                $currency = get_woocommerce_currency_symbol();
                $price = get_post_meta( $post['ID'], '_regular_price', true);
                $sale = get_post_meta( $post['ID'], '_sale_price', true);

                if ($sale) {
                    $HTMLprice = '<del>' . esc_html($currency . $price) . '</del> ' . esc_html($currency . $sale);
                } else {
                    $HTMLprice = esc_html($currency . $price);
                }
                $post['price_html'] = $HTMLprice;
                $post['featured_img'] = get_the_post_thumbnail_url($post['ID'], 'woocommerce_gallery_thumbnail');
            }
            $posts[$i] = $post;
            $i++;
        }
        return $posts;
    }
}
new spSearchResult();