(function($) {
    jQuery(document).ready(function () {
        // let $ = jQuery;
        let search = $('#search_query');
        let results = $('.sp-search-results');
        let timeout;
    
        search.on('input', function () {
            $('.sp-search-results').hide();
            clearTimeout(timeout);
            if (search.val() == '') {
                results.html('');
            } else if (search.val().length > 0) {
                timeout = setTimeout(spCreateRequest, 1000);
        
                function spCreateRequest() {
                    $('label.sp-lable').toggleClass('loading');
                    let html = '';
                    var jqxhr = $.post("http://twenty-twenty-two.test:8081/wp-json/searchpro/v1/query",{query: search.val()} , function (response) {
                        $('.sp-search-results').show();
                        if (response.length == 0) {
                            html = `<p class="sp-no-rest">No result found!</p>`;
                        } else {
                            $(response).each(function() {
                                let post = $(this)[0];
                                html = html + `<li class="sp-s-result ${post.post_type}">`;
                                if (post.post_type == 'page') {
                                    html = html + `<div class="icon" title="Page">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" viewBox="0 0 16 20" fill="none">
                                        <path d="M3 19H13C13.5304 19 14.0391 18.7893 14.4142 18.4142C14.7893 18.0391 15 17.5304 15 17V7.414C14.9999 7.1488 14.8946 6.89449 14.707 6.707L9.293 1.293C9.10551 1.10545 8.8512 1.00006 8.586 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </div>`;
    
                                } else if (post.post_type == 'post') {
                                    html = html + `<div class="icon" title="Post">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 21 21" fill="none">
                                        <path d="M1.555 9.75H3.5C4.03043 9.75 4.53914 9.96071 4.91421 10.3358C5.28929 10.7109 5.5 11.2196 5.5 11.75V12.75C5.5 13.2804 5.71071 13.7891 6.08579 14.1642C6.46086 14.5393 6.96957 14.75 7.5 14.75C8.03043 14.75 8.53914 14.9607 8.91421 15.3358C9.28929 15.7109 9.5 16.2196 9.5 16.75V19.695M6.5 2.685V4.25C6.5 4.91304 6.76339 5.54893 7.23223 6.01777C7.70107 6.48661 8.33696 6.75 9 6.75H9.5C10.0304 6.75 10.5391 6.96071 10.9142 7.33579C11.2893 7.71086 11.5 8.21957 11.5 8.75C11.5 9.28043 11.7107 9.78914 12.0858 10.1642C12.4609 10.5393 12.9696 10.75 13.5 10.75C14.0304 10.75 14.5391 10.5393 14.9142 10.1642C15.2893 9.78914 15.5 9.28043 15.5 8.75C15.5 8.21957 15.7107 7.71086 16.0858 7.33579C16.4609 6.96071 16.9696 6.75 17.5 6.75H18.564M13.5 19.238V16.75C13.5 16.2196 13.7107 15.7109 14.0858 15.3358C14.4609 14.9607 14.9696 14.75 15.5 14.75H18.564L13.5 19.238ZM19.5 10.75C19.5 11.9319 19.2672 13.1022 18.8149 14.1942C18.3626 15.2861 17.6997 16.2782 16.864 17.114C16.0282 17.9497 15.0361 18.6126 13.9442 19.0649C12.8522 19.5172 11.6819 19.75 10.5 19.75C9.3181 19.75 8.14778 19.5172 7.05585 19.0649C5.96392 18.6126 4.97177 17.9497 4.13604 17.114C3.30031 16.2782 2.63738 15.2861 2.18508 14.1942C1.73279 13.1022 1.5 11.9319 1.5 10.75C1.5 8.36305 2.44821 6.07387 4.13604 4.38604C5.82387 2.69821 8.11305 1.75 10.5 1.75C12.8869 1.75 15.1761 2.69821 16.864 4.38604C18.5518 6.07387 19.5 8.36305 19.5 10.75Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    </div>`;
                                } else if (post.post_type == 'product' && post.featured_img !== false) {
                                    html = html + `<div class="icon product" title="Post">
                                    <a href="${post.guid}" class="link-icon">
                                    <img width="100" src="${post.featured_img}">
                                    </a>
                                    </div>`;
                                } else {
                                    html = html + `<div class="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 20 20" fill="none">
                                        <path d="M19 19L13 13L19 19ZM15 8C15 8.91925 14.8189 9.82951 14.4672 10.6788C14.1154 11.5281 13.5998 12.2997 12.9497 12.9497C12.2997 13.5998 11.5281 14.1154 10.6788 14.4672C9.82951 14.8189 8.91925 15 8 15C7.08075 15 6.1705 14.8189 5.32122 14.4672C4.47194 14.1154 3.70026 13.5998 3.05025 12.9497C2.40024 12.2997 1.88463 11.5281 1.53284 10.6788C1.18106 9.82951 1 8.91925 1 8C1 6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637 1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    </div>`;
                                }
                                html = html + `<div class="main-content">`;
                                html = html + `<a href="${post.guid}" class="link-title">${post.post_title}
                                ${post.post_type == 'product' ? '('+post.price_html+')' : ''}
                                </a>`;
                                if (post.post_type == 'product') {
                                    html = html + `<div class="excerpt">${post.post_excerpt}</div>`;
                                }
                                html = html + `</div>`;
                                html = html + `</li>`;
                            })
                        }
                        results.html(html);
                        $('label.sp-lable').toggleClass('loading');
                    })
                    .fail(function () {
                        let html = `<p class="sp-no-rest">No result found!</p>`;
                        results.html(html);
                        $('label.sp-lable').toggleClass('loading');
                    })
                }
            }
        })
        
        $(".searchPro > form").submit(function(e){
            return false;
        });
    })
})(jQuery); 
