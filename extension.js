
const St = imports.gi.St;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;
const GLib = imports.gi.GLib;
const Gtk = imports.gi.Gtk;
let txt_otp;

function _cpnow() {
    GLib.spawn_command_line_async("/usr/bin/xclip -selection clipboard /home/henk/.otp");
}

function init() {
    button = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });
    start_timer();
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
    Main.panel._rightBox.remove_child(button);
}

function start_timer()
{
    let obj = {};
    obj = GLib.file_get_contents("/home/henk/.otp" );
    txt_otp = obj[1].toString().trim();
    let txt = new St.Label({ text: txt_otp } );
    button.set_child(txt);
    button.connect('button-press-event', _cpnow);    	
    Mainloop.timeout_add_seconds(30, start_timer);
}
