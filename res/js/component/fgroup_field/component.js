"use strict";

class ComponentFGroupField extends Component {

    static tag = "fgroup_field";

    constructor(element) {
        super(element);
    }

    html() {
        return `
            <div class="group_field">
                {$inner_html}
            </div>
        `;
    }

    handle() {
        super.handle();
        
        let el = this.new_element;

        el.on("active", (ev) => {
            let el = fire.new(ev.target);
            el.addClass("active");
        });

        el.on("desactive", (ev) => {
            let el = fire.new(ev.target);
            el.removeClass("active");
        });

        el.children().trigger("init");
    }
}

fire.component.add(ComponentFGroupField);