$('#register-form').validate({
    submitHandler: function(form) {
        if (confirm('Jesi fakat fakat fakat siguran da hoces da submitas????')){
          console.log(form);
          form.submit();
        }else{
          alert('Dobro ne moras odmah psovati');
        }
      }
})