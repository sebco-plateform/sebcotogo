export class Methodes {
    static  removeInArray(array: any[], element: any) {
        const newArray = array.filter(item => item !== element);
        if(array.length != newArray.length) {
            return true;
        }
        else
            return false;
    }

    static  removeAllArray(array: any[]) {
        array.splice(0, array.length);
        if(array.length == 0) {
            return true;
        }
    }

    
}