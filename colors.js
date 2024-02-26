let barColors = ['green', 'red', 'orange', 'blue', 'rgb(79, 215, 5)', 'purple']

function getBgColors(expr) {
    switch (expr) {
        case 'grass':
            return {
                bgColor: 'bg-green',
                pfColor: 'pf-green'
            }
            break;
        case 'fire':
            return {
                bgColor: 'bg-red',
                pfColor: 'pf-red'
            }
            break;
        case 'water':
            return {
                bgColor: 'bg-blue',
                pfColor: 'pf-blue'
            }
            break;
        case 'bug':
            return {
                bgColor: 'bg-deepred',
                pfColor: 'pf-deepred'
            }
            break;
        case 'normal':
            return {
                bgColor: 'bg-gray',
                pfColor: 'pf-gray'
            }
        case 'electric':
            return {
                bgColor: 'bg-yellow',
                pfColor: 'pf-yellow'
            }
        case 'poison':
            return {
                bgColor: 'bg-purple',
                pfColor: 'pf-purple'
            }
        case 'ground':
            return {
                bgColor: 'bg-brown',
                pfColor: 'pf-brown'
            }
        default:
            return {
                bgColor: 'bg-gray',
                pfColor: 'pf-gray'
            }
    }
}

