Android_Keyboard_Detect
=======================

An imperfect javascript hack to detect when the Android soft keyboard is shown on screen from an input 'focus' event.

- everything still works as it should on iPhone (I haven't tested other devices)

Based on the assumption that when an input.focused the keyboard will come up and repaint the page, triggering a window.resize event.

I used it to show and hide a fixed navigation which is still in the source. 
