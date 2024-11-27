            //star section
            let header = document.querySelector('header');
            let big_star = document.getElementById('big_star');
            let title = document.getElementById('title');
            let text = document.getElementById('text');
            let btn = document.getElementById('btn');
            let stars1 = document.getElementById('stars1');
            let stars2 = document.getElementById('stars2');

            window.addEventListener('scroll', function() {
                let value = window.scrollY;
                header.style.top = value * 0.5 + 'px';
                big_star.style.top = value * 1.05  + 'px';
                title.style.opacity = 1 - +window.pageYOffset/150 + '';
                text.style.opacity = 1 - +window.pageYOffset/150 + '';
                btn.style.opacity = 1 - +window.pageYOffset/150 + '';
                stars2.style.opacity = 1 - +window.pageYOffset/250 + '';
                stars2.style.top = value * .5  + 'px';
                stars1.style.top = value * .5  + 'px';
            })

            //check if element is in viewport
            function isInPartialViewport(element) {
                // Get the bounding client rectangle position in the viewport
                var bounding = element.getBoundingClientRect();
                
                // Checking part. Here the code checks if it's *fully* visible
                if (
                    bounding.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                    bounding.left >= 0 &&
                    bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
                    bounding.bottom >= 0
                ) {
                    console.log('In the viewport! :)');
                    return true;
                } else {
                    console.log('Not in the viewport. :(');
                    return false;
                }
            }

            //quote section
            let quote = document.getElementById("quote");
            window.addEventListener('scroll', function (event) {
                if (isInPartialViewport(quote)) {
                    document.querySelector(".animated").classList.add("fadeInQuote");
                }
                else {
                    document.querySelector(".animated").classList.remove("fadeInQuote");
                }
            }, false);

            //me section
            let star_person  = document.getElementById('star_person');
            let me = document.getElementById('me');

            window.addEventListener('scroll', function (event) {
                if (isInPartialViewport(me)) {
                    document.querySelector(".animate_person").classList.add("descend");
                    document.querySelector(".animate_stars").classList.add("fadeInGlimmers");
                }
            }, false);

            //when refresh bring to top of page
            window.onbeforeunload = function () {
                window.scrollTo(0, 0);
            }