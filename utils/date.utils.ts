export function subtractDays(date: Date, numberDays: number){
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - numberDays)
    return newDate
}