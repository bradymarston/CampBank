import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "sort-array-by-name"
})
export class SortArrayByNamePipe implements PipeTransform {
    transform(array: Array<any>, args: any): Array<any> {
        array.sort((a: any, b: any) => {
        /*    if (a < b) {
                return -1;
            } else if (a > b) {
                return 1;
            } else {
                return 0;
            }*/
            return 0;
        });
        return array;
    }
}