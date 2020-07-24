/*jshint esversion: 6 */
/**FOR COMMON FUNCTIONS */

/** HELPER FUNCTION TO PROVIDE MONTH NAME*/
function getMonthName(month) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[month];
}

/** CODE TO FADE OUT ELEMENT - CREDIT ONLINE TUTORIALS YOUTUBE.
 * EDITED TO HAVE MY OWN CUSTOM FADE EFFECT*/
function fadeLogo() {
    let lastScrollTop = 10;
    let logo = document.getElementById("logo-container");
    /** let headerMessage = document.getElementById("headerMessage"); */
    window.addEventListener("scroll", function () {
        let scrollTop = window.pageYoffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            logo.style.backgroundColor = '#d0ecfd';
            logo.style.opacity = "0.93";
            logo.style.boxShadow = '0 1px 6px 0 rgb(236,219,65)';
        } else {
            logo.style.backgroundColor = 'transparent';
            logo.style.boxShadow = 'none';
            logo.style.opacity = "1";
        }
    });
}

fadeLogo();