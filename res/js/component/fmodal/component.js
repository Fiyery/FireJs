"use strict";

class ComponentFModal extends Component {

    static tag = "fmodal";

    constructor(element) {
        super(element);
    }

    html() {
        return `
            <div class="modal">
                <div class="box">
                    <div class="head">
                        <div class="title">{$title}</div>
                        <a class="close">
                            <img src="{$image}" title="Fermer la Popin"/>
                        </a>
                    </div>
                    <div class="content">
                        {$inner_html}
                    </div>
                </div>
                <div class="background_mask"></div>
            </div>
        `;
    }

    bind(html) {
        html = html.replace("{$title}", this.attributes["data-title"]);
        delete this.attributes["data-title"];
        html = html.replace("{$image}", this.attributes["data-image"]);
        delete this.attributes["data-image"];
        return super.bind(html);
    }

    action() {
        let el = this.new_element;

        el.find(".close, .background_mask").on("click", (ev) => {
            let el = fire.new(ev.target);
            el.parents(".modal").trigger("close");
        });
    }

    handle() {
        super.handle();
        
        let el = this.new_element;

        el.on("close", (ev) => {
            let el = fire.new(ev.target);
            el.addClass("hide").removeClass("visible");
        });

        el.on("open", (ev) => {
            let el = fire.new(ev.target);
            el.removeClass("hide").addClass("visible");
        });
    }
}

fire.component.add(ComponentFModal);