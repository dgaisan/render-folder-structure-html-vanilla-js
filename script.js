(function run(folders = []) {
    if (!folders.length) { return; }
    
    const folderIcon = `<i class="fas fa-folder"></i>`;
    const htmlElementTemplate = 
        `<div id="{0}" class="{4}" style="position:relative; left:{1}">
            {5}
            <span>{2}</span>{3}
        </div>`;
    const leftOffsetStep = 10;
    const rootElement = document.querySelector('#root');
    
    let currentState = null;
    const idToElementMap = {};

    // initial render
    renderView();

    function renderView() {
        const state = getCurrentState();
        const html = createHtmlFromState(state);
        
        rootElement.innerHTML = `<div id="files">${html}</div>`;
        createClickEvents();
    }

    function createClickEvents() {
        const directories = document.querySelectorAll('#files .directory,.file');
        directories.forEach((dir) => {
            dir.addEventListener('click', setClickEvent);
        });
        console.log(directories);
    }

    function setClickEvent(event) {
        event.stopPropagation();

        if (event.currentTarget && event.currentTarget.classList.contains('directory')) {
            const clickedElementId = event.currentTarget.id;
            toggleFolderExpandState(clickedElementId);
            renderView();
        }
    }

    function toggleFolderExpandState(folderId) {
        idToElementMap[folderId].isExpanded = !idToElementMap[folderId].isExpanded;
    }

    function getCurrentState() {
        if (currentState) { return currentState; }
        currentState = folders.reduce((files, currentFile) => {
            assignFileStateProps(currentFile, 1);
            console.log(currentFile);
            return [...files, currentFile];
        }, []);
        return currentState;
    }

    function assignFileStateProps(currentFolder, level) {
        currentFolder.level = level;
        currentFolder.isExpanded = true;
        currentFolder.id = crypto.randomUUID();
        idToElementMap[currentFolder.id] = currentFolder;

        if (currentFolder.children && currentFolder.children.length) {
            currentFolder.children.forEach(f => { assignFileStateProps(f, level + 1); })
        }
    }

    function createHtmlFromState(state) {
        return state.reduce((html, currentFile) => {
            const isDirectory = currentFile.children && currentFile.children.length;
            let children = "";
            
            if (isDirectory && currentFile.isExpanded) {
                children = createHtmlFromState(currentFile.children);
            }

            return html + 
                format(
                    htmlElementTemplate, 
                    currentFile.id, 
                    currentFile.level * leftOffsetStep, 
                    currentFile.name, 
                    children,
                    isDirectory ? "directory" : "file",
                    isDirectory ? folderIcon : "");
        }, '');
    }

    // string formating function: 
    // format("Formatted {0}, formatted {1}", "one", "two")
    function format(str, ...args) {
        return str.replace(/{(\d+)}/g, function(match, number) { 
          return typeof args[number] != 'undefined'
            ? args[number]
            : match
          ;
        });
    }

})(createTestFoldersTree());

// Test cases
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