import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'attributeFilter',
    pure: false
})
export class AttributeFilterPipe implements PipeTransform {
    transform(items: any[], attributes: string[]): any {
        if (!items || !attributes) {
            return items;
        }
        
        return items.filter(item => {
            var include = false;
            item.attributes.forEach(attribute => {
                if (attributes.includes(attribute)) {
                    include = true;
                }
            });
            return include;
        });
    }
}