export interface LocatorCandidate {

    priority: number;

    type: string;

    value: string;

}

export class LocatorStrategy {

    public static readonly PRIORITY = {

        DATA_TEST_ID: 1,

        ARIA_LABEL: 2,

        ID: 3,

        NAME: 4,

        PLACEHOLDER: 5,

        ROLE: 6,

        TEXT: 7,

        CSS: 8,

        XPATH: 9

    };

}