package com.example.ems.service;

public class DashboardStats {
	private long totalEmployees;
    private long totalDepartments;
    private double averageSalary;
    private double maxSalary;
    private double minSalary;
    private long newHiresThisMonth;
    private String topDepartment;
    
    public DashboardStats() {}
    
    public DashboardStats(long totalEmployees, long totalDepartments, double averageSalary, 
            double maxSalary, double minSalary, long newHiresThisMonth, 
            String topDepartment) {
    		this.totalEmployees = totalEmployees;

    		this.totalDepartments = totalDepartments;
    		this.averageSalary = averageSalary;
			this.maxSalary = maxSalary;
			this.minSalary = minSalary;
			this.newHiresThisMonth = newHiresThisMonth;
			this.topDepartment = topDepartment;
    }

	public long getTotalEmployees() {
		return totalEmployees;
	}

	public void setTotalEmployees(long totalEmployees) {
		this.totalEmployees = totalEmployees;
	}

	public long getTotalDepartments() {
		return totalDepartments;
	}

	public void setTotalDepartments(long totalDepartments) {
		this.totalDepartments = totalDepartments;
	}

	public double getAverageSalary() {
		return averageSalary;
	}

	public void setAverageSalary(double averageSalary) {
		this.averageSalary = averageSalary;
	}

	public double getMaxSalary() {
		return maxSalary;
	}

	public void setMaxSalary(double maxSalary) {
		this.maxSalary = maxSalary;
	}

	public double getMinSalary() {
		return minSalary;
	}

	public void setMinSalary(double minSalary) {
		this.minSalary = minSalary;
	}

	public long getNewHiresThisMonth() {
		return newHiresThisMonth;
	}

	public void setNewHiresThisMonth(long newHiresThisMonth) {
		this.newHiresThisMonth = newHiresThisMonth;
	}

	public String getTopDepartment() {
		return topDepartment;
	}

	public void setTopDepartment(String topDepartment) {
		this.topDepartment = topDepartment;
	}
    
    
}
