(function(){
    
    var formback = document.querySelector('.form');
    var requiredFields= document.querySelectorAll('[data-valid="required"]');
    var emailValue = document.querySelector('[data-email]');
    var numberValue = document.querySelector('[data-number]');
    emailValue.onchange= emailChange;
    numberValue.onchange = numberChange;
    if (formback) {
        formback.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var validate = (requiredFields !=="undefined" && emailValue !=="undefined"  && numberValue !=="undefined" )? isValid(requiredFields, emailValue, numberValue):null;
        });
    }

    function isValid (prequiredFields, pemailValue, pnumberValue) {           

        if (!isAllCompleted(prequiredFields)) {
            console.log('Заполните пожалуйста все необходимые поля');
            return false;
        } else if (!emailOnChange(pemailValue.value)) {
            console.log('Не верный email');
            return false;
        } else if (!numberOnChange(pnumberValue.value)) {
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
            if(data[i].type=="text") {
                if (!isNotEmpty(data[i].value)) {               
                    data[i].className = "form__input__wrong";
                    result = false;                    
                }
                else{
                    data[i].className = "form__input";
                }
            }            
            else {
                if (!data[i].checked){ 
                    console.log("checkbox")
                    data[i].className = "form__input__wrong";
                    result = false;
                }
                else{
                    data[i].className = "form__input";
                }                
            }
            
        }

        return result;
    };  

}());