
document.addEventListener('DOMContentLoaded', function() {
    // Define the players
    const players = ['Yahya', 'Malik', 'Abdelkhalik', 'Badran', 'Aley', 'Yassin', 'Ahmed', 'Abobakr'];
    
    // Define week ranges (column indices, starting from 0)
    const weeks = [
        { name: 'week1', startCol: 2, endCol: 8 },   // July 1-7 (columns 2-8)
        { name: 'week2', startCol: 9, endCol: 15 },  // July 8-14
        { name: 'week3', startCol: 16, endCol: 22 }, // July 15-21
        { name: 'week4', startCol: 23, endCol: 32 }  // July 22-31
    ];
    
    // Process each player
    players.forEach(player => {
        // Find the player's row
        const rows = document.querySelectorAll('tr');
        let playerRow;
        
        rows.forEach(row => {
            if (row.querySelector('th') && row.querySelector('th').textContent.trim() === player) {
                playerRow = row;
            }
        });
        
        if (!playerRow) return;
        
        const cells = playerRow.querySelectorAll('td, th');
        let monthlyTotal = 0;
        
        // Calculate weekly totals
        weeks.forEach(week => {
            let weekTotal = 0;
            
            for (let i = week.startCol; i <= week.endCol; i++) {
                if (cells[i]) {
                    const value = parseFloat(cells[i].textContent.trim()) || 0;
                    weekTotal += value;
                }
            }
            
            // Update the week total cell (columns 33-36)
            const weekCellIndex = 32 + weeks.indexOf(week) + 1;
            if (cells[weekCellIndex]) {
                cells[weekCellIndex].textContent = weekTotal.toFixed(1);
            }
            
            monthlyTotal += weekTotal;
        });
        
        // Update monthly total (last column)
        if (cells[cells.length - 1]) {
            cells[cells.length - 1].textContent = monthlyTotal.toFixed(1);
        }
    });
});
