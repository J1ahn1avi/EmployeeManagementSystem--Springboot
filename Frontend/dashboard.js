const API_BASE_URL = 'http://localhost:8080/api/employees';

// Load dashboard data when page loads
document.addEventListener('DOMContentLoaded', loadDashboard);

async function loadDashboard() {
    try {
        await loadStatistics();
        await loadDepartmentChart();
        await loadSalaryChart();
    } catch (error) {
        console.error('Error loading dashboard:', error);
        showError('Failed to load dashboard data');
    }
}

async function loadStatistics() {
    try {
        const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
        const stats = await response.json();
        
        document.getElementById('totalEmployees').textContent = stats.totalEmployees || 0;
        document.getElementById('totalDepartments').textContent = stats.totalDepartments || 0;
        document.getElementById('avgSalary').textContent = stats.averageSalary ? 
            '$' + stats.averageSalary.toLocaleString() : '-';
        document.getElementById('newHires').textContent = stats.newHiresThisMonth || 0;
        document.getElementById('topDepartment').textContent = stats.topDepartment || 'N/A';
        document.getElementById('salaryRange').textContent = stats.minSalary && stats.maxSalary ?
            `$${stats.minSalary.toLocaleString()} - $${stats.maxSalary.toLocaleString()}` : '-';
            
    } catch (error) {
        console.error('Error loading statistics:', error);
    }
}

async function loadDepartmentChart() {
    try {
        const response = await fetch(`${API_BASE_URL}/analytics/department-count`);
        const data = await response.json();
        
        const departments = data.map(item => item.department);
        const counts = data.map(item => item.count);
        
        const ctx = document.getElementById('departmentChart').getContext('2d');
        
        // Destroy existing chart if it exists
        if (window.departmentChart) {
            window.departmentChart.destroy();
        }
        
        window.departmentChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: departments,
                datasets: [{
                    label: 'Number of Employees',
                    data: counts,
                    backgroundColor: [
                        '#667eea',
                        '#48bb78',
                        '#f56565',
                        '#ed8936',
                        '#4299e1',
                        '#9f7aea',
                        '#fbbf24',
                        '#38b2ac'
                    ],
                    borderWidth: 2,
                    borderColor: 'white'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: ${value} employees (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
        
    } catch (error) {
        console.error('Error loading department chart:', error);
    }
}

async function loadSalaryChart() {
    try {
        const response = await fetch(`${API_BASE_URL}/analytics/salary-stats`);
        const stats = await response.json();
        
        const ctx = document.getElementById('salaryChart').getContext('2d');
        
        // Destroy existing chart if it exists
        if (window.salaryChart) {
            window.salaryChart.destroy();
        }
        
        window.salaryChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Min Salary', 'Average Salary', 'Median Salary', 'Max Salary'],
                datasets: [{
                    label: 'Salary ($)',
                    data: [
                        stats.minSalary || 0,
                        stats.averageSalary || 0,
                        stats.medianSalary || 0,
                        stats.maxSalary || 0
                    ],
                    backgroundColor: [
                        '#48bb78',
                        '#667eea',
                        '#9f7aea',
                        '#f56565'
                    ],
                    borderWidth: 1,
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Salary ($)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Statistics Type'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return '$' + context.raw.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
        
    } catch (error) {
        console.error('Error loading salary chart:', error);
    }
}

function showError(message) {
    console.error(message);
    // You can add a toast notification here if desired
}