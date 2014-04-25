
/*
* Problem: On Android, when you dismiss the soft keyboard the input field does not trigger a 'blur' event
* reshowing the bottom nav on 'blur' wouldn't work
*
* This method detects the interaction in a different way:
*
* 1. while input is in focus
* 2. listen for window.resize (triggered by soft keyboard when it's shown)
* 3. everytime the window.resize is triggered while the input is in 'focus' toggle a boolean
* 4. hide or show the bottom nav based on the boolean
* 5. as a follow up - show the bottom nav if the input triggers 'blur'
*
* */

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

    var isKeyboardShown = null;

    $(document).unbind('focus').on("focus", "input, textarea, select", function() {
        isKeyboardShown = false; //the keyboard hasn't happened yet. set false
    });

    $(window).unbind('resize').resize(function() {

        // only flip the state when it's NOT null.
        // This is because this resize event happens outside of the blur event sometimes
        // keeps it from firing in a resize that's not happening from an input blur
        if(isKeyboardShown !== null)
            isKeyboardShown = (isKeyboardShown == false);

        //if the keyboard is visible, hide the bottom nav
        //else show the keyboard
        if(isKeyboardShown)
            $('.bottom-menu').hide();
        else
            $('.bottom-menu').show();
    });

    $(document).unbind('blur').on("blur", "input, textarea, select", function() {

        //make sure the bottom menu doesn't reappear when jumping from one input to another
        /* the resize was happening outside the blur and doing strange things to my boolean */
        if(isKeyboardShown !== true)
            $('.bottom-menu').show();

        isKeyboardShown = null; //reset the boolean to the original null state
    });
}
