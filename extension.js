
const St = imports.gi.St;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;
const GLib = imports.gi.GLib;
let txt_otp;

function _hideHello() {
    Main.uiGroup.remove_actor(text);
    text = null;
}

function init() {
    button = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });
    let icon = new St.Icon({ icon_name: 'system-run-symbolic',
                             style_class: 'system-status-icon' });
    let txt = new St.Label({ style_class: 'googleauth-label', text: "Woot" });

    button.set_child(txt);
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
    Mainloop.timeout_add_seconds(1, start_timer);
}
