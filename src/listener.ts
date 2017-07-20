if (typeof lookerIsOn === 'undefined') {
  console.log("LOOKER is on");
  var lookerIsOn = true;
  document.addEventListener('mouseover', function (event) {
    let altKey = event.altKey;
    let target = <HTMLElement>event.target;
    let targetElement: any = {};
    for (const prop in target) {
      targetElement[prop] = target[prop];
    }
    let attributes = {};
    for (let i = 0; i < target.attributes.length; i++) {
      const attr = target.attributes[i];
      console.debug(attr);
      attributes[attr.localName] = {};
      for (let prop in attr) {
        console.debug(prop);
        attributes[attr.localName][prop] = attr[prop];
      }
    }
    targetElement.attributes = attributes;

    let message = {
      event: {
        altKey,
        target: targetElement
      }
    };
    console.debug(altKey, target, event, message);
    chrome.runtime.sendMessage(message);
  })
}