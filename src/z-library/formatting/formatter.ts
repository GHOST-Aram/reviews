class Formatter{
    public extractPriceRange = (
        rangeString: string): PriceRange =>{
        const { start, end } = this.convertToNumbers(rangeString)

        if(typeof start === 'number' && typeof end === 'number'){
            if(start < end)
                return this.assignValues(start, end)
            else if( end < start)
                return this.swapValues(start, end)
        }

        return { start: null, end: null}
    }

    public convertToNumbers = (rangeString: string) =>{
        const stringArr = rangeString.trim().split('-')
        
        const start = Number(stringArr[0])
        const end = Number(stringArr[1])

        return { start, end }
    }

    private assignValues = (
        start: number, end: number): PriceRange =>{
            let priceRange:PriceRange = {
                start: null,
                end: null
            }

            priceRange.start = start
            priceRange.end = end

            return priceRange
    }

    private swapValues = (
        start: number, end: number): PriceRange =>{
            let priceRange:PriceRange = {
                start: null,
                end: null
            }
            priceRange.start = end
            priceRange.end = start

            return priceRange
    }

    public formatFieldName(fieldName: string): string{
        const formattedName = fieldName.charAt(0)
            .toUpperCase() 
            .concat(fieldName.slice(1))
            .replaceAll(/_/gi, ' ')
        
        return formattedName
    }
}

export const formatter = new Formatter()
export interface PriceRange{
    start: number | null
    end: number | null
}