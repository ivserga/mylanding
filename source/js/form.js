(function(){
    
    //'use strict';
    var nodemailer = require('../lib/nodemailer');
    var formback = document.querySelector('.form');
    var formtext = document.querySelector('.form__text');
    var requiredFields= document.querySelectorAll('[data-valid="required"]');
    var emailValue = document.querySelector('[data-email]');
    var numberValue = document.querySelector('[data-number]');
    var checker = document.querySelector('[data-check]');
    var nameValue = document.querySelector('[data-name]');
    var messValue = document.querySelector('[data-mess]');
    var rightlink = document.querySelector('.right');
    var rightlinktext = document.querySelector('.textright');


function smfromsite(){
    let smtpTransport;
    try {
        smtpTransport = nodemailer.createTransport({
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true, // true for 465, false for other ports 587
        auth: {
            user: "exenoyon@yandex.ru",
            pass: "urag-sha"
        }
        });
    } catch (e) {
        return console.log('Error: ' + e.name + ":" + e.message);
    }

    let mailOptions = {
        from: "exenoyon@yandex.ru", // sender address
        to: 'ivsa79@mail.ru', // list of receivers
        subject: 'проверка связи', // Subject line
        text: 'раз два три', // plain text body
        html: '<p>Hello</p>'   // html body
    };

    smtpTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
        // return console.log(error);
        return console.log('Error');
        } else {
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }
    //res.render('feed-ok', {msg: 'В ближайшее время мы с Вами свяжемся и ответим на все вопросы'});
    //res.redirect('http://baedeker.club')
    });
}


    rightlink.addEventListener('click', linkClick);
    rightlink.onblur = showrightlinktext;
    nameValue.onchange = nameChange;
    messValue.onchange = nameChange;
    emailValue.onchange= emailChange;
    numberValue.onchange = numberChange;
    checker.onchange=checkChange;
   
    if (formback) {
        formback.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var validate = (requiredFields !=="undefined" && emailValue !=="undefined"  && numberValue !=="undefined" )? isValid(requiredFields, emailValue, numberValue):null;
            if(validate)
            {
                var mess = {'name':nameValue, 'email':emailValue, 'tel':numberValue, 'message': messValue };
                smfromsite()
                clearform(requiredFields);                
                formtext.textContent = "Ваша заявка принята, мы свяжемся с Вами в ближайшее время";
            }
        });
    }

    function showrightlinktext(e){
        var temp5= rightlinktext;        
        temp5.classList.remove("textright__show");
    };

    function linkClick(e){
        e.preventDefault();        
        var temp6 = rightlinktext;
        if(temp6.className==="textright")
            temp6.classList.add("textright__show");
        else
        temp6.classList.remove("textright__show");
    };

    function isValid (prequiredFields, pemailValue, pnumberValue) {           

        if (!isAllCompleted(prequiredFields)) {            
            return false;
        } else if (!emailOnChange(pemailValue.value)) {            
            return false;
        } else if (!numberOnChange(pnumberValue.value)) {           
            return false;
        }
        return true;
    }; 

    function checkChange(e) {
        var temp1= e.target;    
       if (!temp1.checked ){           
           temp1.classList.add("form__input__wrong") ;          
       }
       else {
            temp1.classList.remove("form__input__wrong") ;            
            temp1.classList.add("form__input") ; 
       }
    } 

    function nameChange(e) {
        var temp2= e.target;    
       if (!isNotEmpty(temp2.value)){           
           temp2.classList.add("form__input__wrong") ;
           temp2.value= null;
       }
       else {  
            temp2.classList.remove("form__input__wrong") ;            
            temp2.classList.add("form__input") ; 
       }
    }
    function emailChange(e) {
        var temp3= e.target;    
       if (!emailOnChange(temp3.value)){           
           temp3.classList.add('form__input__wrong'); 
           temp3.value= null;
       }
       else {            
            temp3.classList.remove('form__input__wrong');
       }
    }

    function numberChange(e) {
        var temp4= e.target;    
       if (!numberOnChange(temp4.value)){           
           temp4.classList.add('form__input__wrong'); 
           temp4.value= null;
       }
       else {            
            temp4.classList.remove('form__input__wrong');
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
                    data[i].classList.add('form__input__wrong');               ///className = "form__input__wrong";
                    result = false;                    
                }
                else{
                    data[i].classList.remove('form__input__wrong');             //className = "form__input";
                }
            }            
            else {
                if (!data[i].checked){                    
                    data[i].classList.add('form__input__wrong');  
                    result = false;
                }
                else{
                    data[i].classList.remove('form__input__wrong');  
                }                
            }
            
        }

        return result;
    }; 
    function clearform (data) {
        for (var i = 0; i < data.length; i++) {
            if(data[i].type=="text") {                
                data[i].value = null;
                data[i].classList.remove('form__input__wrong');         
            }            
            else {
                if (data[i].checked){                     
                    data[i].checked = false;
                    data[i].classList.remove('form__input__wrong');                      
                }                           
            }          
        }       
    };   

}());