const getElementScale = (screenWidth, screenHeight, elementWidth, elementHeight, correction = 0.0001) => {
    const widthScale = screenWidth/elementWidth;
    const heightScale = screenHeight/elementHeight;
    
    if(widthScale < heightScale){
        return widthScale - correction;
    }
    
    return heightScale - correction;
}

const getElementPosition = (original, scale) => {
    const scaledSize = original * scale;

    return (scaledSize - original)/2;
}

const getCenterPosition = (screenSize, elementSize, elementScale) => {
    const scaledElementSize = elementSize * elementScale;

    return (screenSize - scaledElementSize)/2;
}

const resizeElement = (element, screenWidth, screenHeight) => {
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;
    const elementScale = getElementScale(screenWidth, screenHeight, elementWidth, elementHeight);
    const leftPosition = getElementPosition(elementWidth, elementScale);
    const leftCenter = getCenterPosition (screenWidth, elementWidth, elementScale);
    const topPosition = getElementPosition(elementHeight, elementScale);
    const topCenter = getCenterPosition (screenHeight, elementHeight, elementScale);

    element.style.transform = `scale(${elementScale})`;
    element.style.position = 'absolute';
    element.style.left = `${leftPosition + leftCenter}px`;
    element.style.top =  `${topPosition + topCenter}px`;
}

const windowResized = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    document.querySelectorAll(`.resize--full`).forEach((element) => {
        resizeElement(element, screenWidth, screenHeight);
    });
}

const resizeStart = () => {
    window.addEventListener('resize', windowResized);
    windowResized();
}

resizeStart();