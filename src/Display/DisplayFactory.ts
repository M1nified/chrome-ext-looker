class DisplayFactory {
    produce(element: HTMLElement) {
        var display;
        switch (element.tagName.toLowerCase()) {
            case 'a':
                display = new DisplayA(element);
            default:
                display = new DisplayDefault(element);
        }
        return display;
    }
}