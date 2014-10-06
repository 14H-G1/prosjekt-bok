$('#open-login').click(function(e) {
    $('#login-modal').lightbox_me({
        centered: true,
        onLoad: function() {
            $('#sign_up').find('input:first').focus()
            }
        });
    e.preventDefault();
});
