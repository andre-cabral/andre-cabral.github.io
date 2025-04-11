const goToPage = (pageName) => {
    document.querySelectorAll(`.page`).forEach((element) => {
        element.classList.remove('page--show');
    });
    
    document.getElementById(`page-${pageName}`).classList.add('page--show');
}

const goToClick = (element) => {
    element.classList.forEach((classToCheck) => {
        if (classToCheck.indexOf('goto-') > -1) {
            goToPage(classToCheck.replace('goto-', ''));
            return;
        }
    });
}

const pageChangeStart = () => {
    document.querySelectorAll('[class*="goto-"]').forEach((element) => {
        element.addEventListener('click', () => {goToClick(element)});
    });
}

pageChangeStart();