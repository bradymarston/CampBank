import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "dummy"
})
export class DummyPipe implements PipeTransform {
    transform(array: Array<any>, args: any): Array<any> {
        array.sort((a: any, b: any) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });
        return array;
    }
}