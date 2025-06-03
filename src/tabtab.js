

function Tabtab(selector) {
    this.container = document.querySelector(selector);
    if(!this.container) {
        console.error(`Tabtab: Container with selector "${selector}" not found.`);
        return;
    }

    this.tabs = Array.from(this.container.querySelectorAll("li a"));
    if(!this.tabs.length) {
        console.error(`Tabtab: No tabs found in the container`);
        return;
    };

    this.panels = this.tabs.map(tab => {

        const panel = document.querySelector(tab.getAttribute("href"));
        if(!panel) {
            console.error(`Tabtab: Panel with href "${tab.getAttribute("href")}" not found.`);
        }
        return panel
    }).filter(Boolean)
    
    if(this.tabs.length !== this.panels.length) return;

    this._init()

};

Tabtab.prototype._activeTab = function(tab) {
    this.tabs.forEach(tab => {
        tab.closest("li").classList.remove("tab--active")
    })
    tab.closest("li").classList.add("tab--active")

    this.panels.forEach(panel => panel.hidden = true);
    const panelActive = document.querySelector(`${tab.getAttribute("href")}`)
    panelActive.hidden = false;
}

Tabtab.prototype._init = function() {
    const hashTab = location.hash;
    let defaultTab = this.tabs[0]
    
    this._activeTab(defaultTab);

    this.tabs.forEach(tab => {
        tab.onclick = (e) => this._handleTabClick(e, tab)
    })
};

Tabtab.prototype._handleTabClick = function(e,tab) {
    e.preventDefault();
    this._activeTab(tab);
};


Tabtab.prototype.switch = function(input) {
    let tabToActive = null;

    if(!input) {
        console.error("Tabtab: No input provided to switch tabs.");
        return;
    }
    if(typeof input === "string") {
        tabToActive =  this.tabs.find(tab => {
            return tab.getAttribute("href") === input;
            ;
        })
        if(!tabToActive) {
            console.error(`Tabtab: No tab found with href "${input}"`);
            return;
        }
    }
    else if (this.tabs.includes(input)) {
        tabToActive = input
    }
    
    if(!tabToActive) {
        console.error(`Tabtab: No vailid input '${input}'`);
        return;
    }
    this._activeTab(tabToActive);

}

Tabtab.prototype.destroy = function() {
    this.tabs.forEach(tab => {
        tab.onclick = null;
        tab.closest("li").classList.remove("tab--active");
    });
    this.panels.forEach(panel => panel.hidden = false);
    this.container = null;
    this.tabs = null;
    this.panels = null;
    
}


