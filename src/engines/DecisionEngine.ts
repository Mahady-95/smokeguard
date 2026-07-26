import { ComponentInventory } from "../models/ComponentInventory";
import { ExecutionPlan } from "../models/ExecutionPlan";
import { ValidationTask } from "../models/ValidationTask";

export class DecisionEngine {

    public static buildPlan(

        inventory: ComponentInventory

    ): ExecutionPlan {

        const tasks: ValidationTask[] = [];

        if (

            inventory.searchBoxes > 0

        ) {

            tasks.push({

                id: "search",

                name: "Search Validation",

                validator: "SearchValidator",

                priority: 100,

                enabled: true

            });

        }

        if (

            inventory.paginations > 0

        ) {

            tasks.push({

                id: "pagination",

                name: "Pagination Validation",

                validator: "PaginationValidator",

                priority: 95,

                enabled: true

            });

        }

        if (

            inventory.tables > 0

        ) {

            tasks.push({

                id: "table",

                name: "Table Validation",

                validator: "TableValidator",

                priority: 90,

                enabled: true

            });

        }

        if (

            inventory.dropdowns > 0

        ) {

            tasks.push({

                id: "dropdown",

                name: "Dropdown Validation",

                validator: "DropdownValidator",

                priority: 80,

                enabled: true

            });

        }

        if (

            inventory.checkboxes > 0

        ) {

            tasks.push({

                id: "checkbox",

                name: "Checkbox Validation",

                validator: "CheckboxValidator",

                priority: 70,

                enabled: true

            });

        }

        if (

            inventory.radios > 0

        ) {

            tasks.push({

                id: "radio",

                name: "Radio Validation",

                validator: "RadioValidator",

                priority: 65,

                enabled: true

            });

        }

        if (

            inventory.fileUploads > 0

        ) {

            tasks.push({

                id: "upload",

                name: "File Upload Validation",

                validator: "FileUploadValidator",

                priority: 60,

                enabled: true

            });

        }

        tasks.sort(

            (a, b) =>

                b.priority - a.priority

        );

        return {

            tasks

        };

    }

}