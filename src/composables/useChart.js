
export function useChart(){
   function axisChartOptions(responsive = true,title,font='Alexandria, sans-serif'){
        return {
            responsive,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: title,
                    font: { 
                        family:font,
                        size: 14, weight: '700' },
                    color: '#092724',
                    padding:{
                        bottom:30
                    }
                },
                legend: { display: false },
                datalabels:{
                    anchor:'end',
                    align:'top',
                    offset:4,
                    color:'#092724',
                    font: { family: font, size: 12, weight: '500' }
                }
            },
            scales: {
                x: {
                type: 'category',
                ticks: {
                    color: '#092724',
                    font: { family: font, size: 10, weight: '500' }
                },
                grid: { display: false }
                },
                y: {
                    beginAtZero: true,
                    ticks: { color: '#697B7A', font: { size: 12,weight:'bold' } },
                    grid: { color: '#f1f1f1' }
                }
            }
        
        }
    }

    return {axisChartOptions}
}