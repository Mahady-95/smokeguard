import { Component } from "../models/Component";

export class LocatorBuilder {

    public static build(component: Component): string {

        if (component.testId.trim()) {

            return `[data-testid="${component.testId}"]`;

        }

        if (component.ariaLabel.trim()) {

            return `[aria-label="${component.ariaLabel}"]`;

        }

        if (component.id.trim()) {

            return `#${component.id}`;

        }

        if (component.name.trim()) {

            return `[name="${component.name}"]`;

        }

        if (component.placeholder.trim()) {

            return `[placeholder="${component.placeholder}"]`;

        }

        if (component.label.trim()) {

            return `text=${component.label}`;

        }

        if (component.role.trim()) {

            return `[role="${component.role}"]`;

        }

        if (component.text.trim()) {

            return `text=${component.text}`;

        }

        return component.selector;

    }

}