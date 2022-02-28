type THtmlElementSpecificationBase = {
    tagName: string;
    attributes?: { [key: string]: string };
    dataset?: { [key: string]: string };
    appendTo?: HTMLElement;
}

type THtmlElementSpecificationChildren = THtmlElementSpecificationBase & {
    children: THtmlElementSpecification[];
}

type THtmlElementSpecificationTextContent = THtmlElementSpecificationBase & {
    textContent: string;
}


export type THtmlElementSpecification =
    THtmlElementSpecificationBase |
    THtmlElementSpecificationChildren |
    THtmlElementSpecificationTextContent;

export function createHtmlElement(htmlSpecification: THtmlElementSpecification): HTMLElement {
    const { tagName, attributes, dataset, appendTo } = htmlSpecification;

    const element = document.createElement(tagName);
    if (attributes) {
        for (const key in attributes) {
            if (attributes.hasOwnProperty(key)) {
                element.setAttribute(key, attributes[key]);
            }
        }
    }

    if ("children" in htmlSpecification) {
        for (const child of htmlSpecification.children) {
            element.appendChild(createHtmlElement(child));
        }
    }

    if ("textContent" in htmlSpecification) {
        element.textContent = htmlSpecification.textContent;
    }

    if (dataset) {
        for (const key in dataset) {
            if (dataset.hasOwnProperty(key)) {
                element.dataset[key] = dataset[key];
            }
        }
    }

    if (appendTo) {
        appendTo.appendChild(element);
    }

    return element;
};