import { Directive } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[positiveIntegerDirective]',
    providers: [{provide: NG_VALIDATORS, useExisting: MustBePositiveIntegerDirective, multi: true}]
})
export class MustBePositiveIntegerDirective implements Validator {
    isInt(value: any) {
        var x;
        if (isNaN(value)) {
            return false;
        }
        x = parseFloat(value);
        return (x | 0) === x;
    }

    validate(control: AbstractControl) : {[key: string]: any} | null {
        if (!this.isInt(control.value) || parseInt(control.value) < 1) {
            return { 'invalidPositiveInteger': true }; // return object if the validation is not passed.
        }
        return null; // return null if validation is passed.
    }
}