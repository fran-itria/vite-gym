
export type component = {
    range: string[] | undefined
    hoursRange: {
        day: string;
        hour: string;
    }[] | undefined
    limit: number | null
    setSelectDay: React.Dispatch<React.SetStateAction<{
        day: string;
        hour: string;
    }>>
    setDefaultTime: React.Dispatch<React.SetStateAction<string | undefined>>
    defaultTime: string | undefined
    actualYear: number
    month: number
    day: number
    selectDay: {
        day: string;
        hour: string;
    }
}