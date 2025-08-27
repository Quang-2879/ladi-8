function wccp_pro_admin_bar_remove_Protection(){
	jQuery.ajax({
        url: ajax_object.ajaxurl, // this is the object instantiated in wp_localize_script function
		
        type: 'POST',
		
        data:{
            action: 'wccp_pro_ajax_top_bar', // this is the function in your functions.php that will be triggered
			
            link: ajax_object.link
        },
        success: async function( data )
		{
			show_wccp_pro_message("This page has been excluded successfully!", "success-wpcp");
			
			var x = await sleep(2 * 1000);
			
            location.reload();
        }
    });
}

function wccp_pro_admin_bar_return_Protection(){
	jQuery.ajax({
        url: ajax_object.ajaxurl, // this is the object instantiated in wp_localize_script function
		
        type: 'POST',
		
        data:{
            action: 'wccp_pro_ajax_top_bar_remove_Protection', // this is the function in your functions.php that will be triggered
			
            link: ajax_object.link
        },
        success: async function( data )
		{
			show_wccp_pro_message("This page has been protected successfully!", "success-wpcp");
			
			await sleep(2 * 1000);
			
            location.reload();
        }
    });
}

async function wccp_pro_watermark_image(url_to_image, index)
{
	var rafEl = document.getElementById('requestAnimationFrame');
	
	jQuery.ajax({
        url: ajax_object.ajaxurl, // this is the object instantiated in wp_localize_script function
		
        type: 'POST',
		
        data:{
            action: 'wccp_pro_advanced_get_link', // this is the function in your functions.php that will be triggered
			
            link: url_to_image
        },
        success: async function( data )
		{
			var x = await wccp_pro_js_sleep(1000);
			
			//return "success2";
        }
    }).done(async function (response)
		{
			if(index % 10 == 0) await wccp_pro_js_sleep(5000); //Sleep 3 seconds every 10 processes
			
			console.log( response );
			
			rafEl.textContent = url_to_image;
			
			do_watermark_call(index + 1);
        })
		.fail(async function(error) {
			console.log(error);
		});
}

function wccp_pro_js_sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}
