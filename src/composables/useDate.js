export function useDate(){

    function dateFormat(date){

        const stringHours = date.split('T')[1];
        const hourData = stringHours.split(':');
        const hour = hourData[0]
        const minute = hourData[1]
        const stringData = date.split('T')[0];
        const data = stringData.split('-');

        const year = data[0];
        const month = Number(data[1]);
        const day = data[2];

        let monthName = '';
        switch(month){
            case 1:
                monthName = 'يناير'
                break;
            case 2:
                monthName = 'فبراير'
                break;
            case 3:
                monthName = 'مارس'
                break;
            case 4:
                monthName = 'أبريل'
                break;
            case 5:
                monthName = 'مايو'
                break;
            case 6:
                monthName = 'يونيو'
                break;
            case 7:
                monthName = 'يوليو'
                break;
            case 8:
                monthName = 'أغسطس'
                break;
            case 9:
                monthName = 'سبتمبر'
                break;
            case 10:
                monthName = 'أكتوبر'
                break;
            case 11:
                monthName = 'نوفمبر'
                break;
            case 12:
                monthName = 'ديسمبر'
                break;
        }

        return `${day} ${monthName} ${year} -  ${hour}:${minute} ${hour >= 12 ? 'م':'ص' }`;
    }

    return {dateFormat}
}