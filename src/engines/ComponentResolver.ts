import { Component } from "../models/Component";
//import { ComponentInventory } from "../models/Component";
import { ComponentInventory } from "../models/ComponentInventory";

export class ComponentResolver {

    public static getByType(

        inventory: ComponentInventory,

        type: string

    ): Component[] {

        return inventory.elements.filter(

            component =>

                component.type === type

        );

    }

    public static getSearchBoxes(

        inventory: ComponentInventory

    ): Component[] {

        return this.getByType(

            inventory,

            "search"

        );

    }

    public static getTables(

        inventory: ComponentInventory

    ): Component[] {

        return this.getByType(

            inventory,

            "table"

        );

    }

    public static getPaginations(

        inventory: ComponentInventory

    ): Component[] {

        return this.getByType(

            inventory,

            "pagination"

        );

    }

    public static getDropdowns(

        inventory: ComponentInventory

    ): Component[] {

        return this.getByType(

            inventory,

            "dropdown"

        );

    }

    public static getCheckboxes(

        inventory: ComponentInventory

    ): Component[] {

        return this.getByType(

            inventory,

            "checkbox"

        );

    }

    public static getRadios(

        inventory: ComponentInventory

    ): Component[] {

        return this.getByType(

            inventory,

            "radio"

        );

    }

    public static getButtons(

        inventory: ComponentInventory

    ): Component[] {

        return this.getByType(

            inventory,

            "button"

        );

    }

    public static getInputs(

        inventory: ComponentInventory

    ): Component[] {

        return this.getByType(

            inventory,

            "input"

        );

    }

    public static getFileUploads(

        inventory: ComponentInventory

    ): Component[] {

        return this.getByType(

            inventory,

            "file-upload"

        );

    }

}