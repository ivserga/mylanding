(function() {
    
    var butwrite = document.querySelector('.writeord');
    var butconsult = document.querySelector('[data-consult]');
    var formsect = "form";
    console.log(butwrite);
    var nav = document.querySelector('.nav');      
    
    if (nav) {
        nav.addEventListener('click', function(e) {
            var target = e.target;

            if (target.tagName.toLowerCase() !== 'a') {
                return;
            }
            e.preventDefault();
            toggleToActiveLink(target);
        });
    }

    function scrollToActiveSection(showedSect) {
        var section = document.querySelector('.' + showedSect);        
        var coords = section.getBoundingClientRect();        
        var animateTime = 0.4;
        var timerId = setInterval(function() {
            var bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (bodyScrollTop < coords.top) {                
                window.scrollBy(0, 10)
            } else {
                clearInterval(timerId);
            }
        }, animateTime || 0.5)
    }

    function toggleToActiveLink (targ) {
        var links = document.querySelectorAll('.nav__link');
        var showedSection = targ.dataset.link;

        for (var i = 0; i < links.length; i++) {
            if (links[i].classList.contains('nav__link--active')) {
                links[i].classList.remove('nav__link--active')
            }
        }
        targ.classList.add('nav__link--active');
        scrollToActiveSection(showedSection);
    };

    if(butwrite)
    {
        butwrite.addEventListener('click', function(e){
            scrollToActiveSection(formsect); 
        });     
    }
    if(butconsult)
    {
        butconsult.addEventListener('click', function(e){
            scrollToActiveSection(formsect); 
        });     
    }
    
}());