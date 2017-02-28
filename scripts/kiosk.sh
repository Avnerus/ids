#!/bin/bash
cat > /home/pi/.config/lxsession/LXDE-pi/autostart << EOM
@xscreensaver -no-splash
@xset s off
@xset -dpms
@xset s noblank
@chromium-browser --incognito --kiosk http://ids.avner.us/  # load chromium after boot
EOM
