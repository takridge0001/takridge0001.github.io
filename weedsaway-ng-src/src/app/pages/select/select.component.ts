import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as data from '../../data/plants.json';

@Component({
   templateUrl: './select.component.html'
})
export class SelectComponent {
    private sub: any;
    public rowNumber = 0;
    public rowLength = 0;

    plants: any = (data as any).default;
    plantsSelected: any = [];
    attributes: any = [...new Set(this.plants.flatMap(x => x.attributes))];
    attributesSelected: any = [...new Set(this.plants.flatMap(x => x.attributes))];
    invalidPlants: any = [];

    constructor(private route: ActivatedRoute, private router: Router, private cookieService: CookieService) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.rowLength = +params['rowLength'];
            this.rowNumber = +params['rowNumber'];
        });

        if (this.rowNumber < 1 || this.rowLength < 1) {
            this.router.navigate(['/start']);
        }

        if (this.cookieService.check('weedsaway')) {
            this.plantsSelected = JSON.parse(this.cookieService.get('weedsaway'));
         }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    attributeFilterChange(event: any) {
        if (event.srcElement.checked) {
            this.attributesSelected.push(event.srcElement.id);
        } else {
            this.attributesSelected.splice(this.attributesSelected.indexOf(event.srcElement.id), 1);
        }
    }

    isInvalid(plantName: any) {
        if (this.invalidPlants.includes(plantName)) {
            return true;
        }

        return false;
    }

    isNonNegativeInt(value: any) {
        var x;
        if (isNaN(value)) {
            return false;
        }
        x = parseFloat(value);
        if((x | 0) === x && x > -1) {
            return true;
        }
        return false;
    }

    plantChanged(event: any) {
        this.plantSelected(event.srcElement.id, event.srcElement.value, event.target);
    }

    plantSelected(id, amount, target) {
        var index = this.invalidPlants.indexOf(id);

        if (this.isNonNegativeInt(amount)) {
            if (target != null) { target.classList.remove("is-invalid"); }
            this.plantsSelected[id] = parseInt(amount);
            this.cookieService.set('weedsaway', JSON.stringify(this.plantsSelected));
            if (index > -1) {
                this.invalidPlants.splice(index, 1);
            }
        } else if (index < 0) {
            if (target != null) { target.classList.add("is-invalid"); }
            this.invalidPlants.push(id);
        }
    }

    plantsToOrder() {
        var ret = [];
        this.plantsSelected.forEach((item, key) => {
            var next = {};
            next["amt"] = item;
            next["plant"] = this.plants[key];
            if (item > 0) {ret.push(next);}
        });
        return ret;
    }
}