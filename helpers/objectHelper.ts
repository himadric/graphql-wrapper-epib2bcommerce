export default {
    convertPropertiesToKeyValue(properties:any): Property[] {
        let propertiesResult: Property[] = [];
        const entries=Object.entries(properties);
        for(const [name, value] of entries) {
            propertiesResult.push(new Property(name, value));
        }
        return propertiesResult;
    }
}

class Property {
    key: string;
    value: string;
    constructor(key:string, value:any) {
        this.key=key;
        this.value=value;
    }
}
