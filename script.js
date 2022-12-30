(function run(folders = []) {
    if (!folders.length) { return; }

    const rootElement = document.querySelector('#root');
    let currentState = null;   

    renderView();

    function renderView() {
        const state = getCurrentState();
        rootElement.innerHTML = `<b onClick="${createClickEvents()}">folders will be displayed here...</b>`;
        console.table('state:', state);
    }

    function createClickEvents() {
        return "eval(alert('handle click...'))";
    }

    function getCurrentState() {
        if (currentState) { return currentState; }
        return folders.reduce((files, currentFile) => {
            assignLevelsAndExpandStatusToFiles(currentFile, 1);
            console.log(currentFile);
            return [...files, currentFile];
        }, [])
    }

    function assignLevelsAndExpandStatusToFiles(currentFolder, level) {
        currentFolder.level = level;
        currentFolder.isExpanded = true;
        UUID
        if (currentFolder.children && currentFolder.children.length) {
            currentFolder.children.forEach(f => { assignLevelsAndExpandStatusToFiles(f, level + 1); })
        }
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