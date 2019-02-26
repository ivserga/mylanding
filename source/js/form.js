(function(){
    
    var formback = document.querySelector('.form-container');
    var requiredFields= document.querySelectorAll('[data-valid="required"]');
    var emailValue = document.querySelector('[data-email]');
    var numberValue = document.querySelector('[data-number]');
    emailValue.onchange= emailChange;
    numberValue.onchange = numberChange;
    formback.onsubmit = isValid;
   

    function isValid () {           

        if (!isAllCompleted(requiredFields)) {
            console.log('Заполните пожалуйста все необходимые поля');
            return false;
        } else if (!emailOnChange(emailValue.value)) {
            console.log('Не верный email');
            return false;
        } else if (!numberOnChange(numberValue.value)) {
            console.log('Не верный номер');
            return false;
        }

        return true;
    }; 

    function emailChange(e) {
        var temp= e.target;    
       if (!emailOnChange(temp.value)){           
           temp.className = "form__input__wrong" ;
           temp.value= null;
       }
       else {            
            temp.className = "form__input" ;
       }
    }

    function numberChange(e) {
        var temp= e.target;    
       if (!numberOnChange(temp.value)){           
           temp.className = "form__input__wrong" ;
           temp.value= null;
       }
       else {            
            temp.className = "form__input" ;
       }
    }

    function emailOnChange(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    function numberOnChange(number) {
        var re = /(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/g ;                               // /^\d+$/;
        return re.test(number);
    };

    function isNotEmpty(str) {
        return Boolean(str);
    };    

    function isAllCompleted(data) {
        var result = true;

        for (var i = 0; i < data.length; i++) {
            if (!isNotEmpty(data[i].value)) {
                if(data[i].type=="checkbox"){
                    data[i].style.boxShadow = "0 0 8px 1px rgba($color: #1e90ff, $alpha: 1.0)" ;
                }
                else
                data[i].className = "form__input__wrong";

                result = false;
                break;
            }
        }

        return result;
    };  

}());