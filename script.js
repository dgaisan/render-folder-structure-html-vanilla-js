(function run(folders = []) {
    if (!folders.length) { return; }

    const rootElement = document.querySelector('#root');    

    renderView();

    function renderView() {
        rootElement.innerHTML = `<b onClick="${createClickEvents()}">folders will be displayed here...</b>`;
    }

    function createClickEvents() {
        return "eval(alert('handle click...'))";
    }
})(createTestFoldersTree());


function createTestFoldersTree() {
    return [
        {
            name: 'public',
            children: [
                {
                    name: 'index.html'
                },
                {
                    name: 'welcome.html'
                }
            ]
        },
        {
            name: 'src',
            children: [
                {
                    name: 'script.js'
                },
                {
                    name: 'routes',
                    children: [
                        {
                            name: 'mainRoute.js'
                        },
                        {
                            name: 'registration.js'
                        }
                    ]
                }
            ]
        },
        {
            name: 'package.json'
        },
        {
            name: 'README'
        },
    ];
}