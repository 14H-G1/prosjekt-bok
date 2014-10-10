$('#open-login').click(function(e) {
    $('#login-modal').lightbox_me({
        centered: true,
        onLoad: function() {
            $('#login-modal-form').find('input:first').focus();
        }
    });
    e.preventDefault();
});

$('#open-upload').click(function(e) {
    $('#upload-modal').lightbox_me({
        centered: true
    });
    e.preventDefault();
});
