package com.example.ems.service;

public class SalaryStats {
	private double minSalary;
    private double maxSalary;
    private double averageSalary;
    private double medianSalary;
    
    
	public SalaryStats() {
		super();
		// TODO Auto-generated constructor stub
	}


	public SalaryStats(double minSalary, double maxSalary, double averageSalary, double medianSalary) {
		super();
		this.minSalary = minSalary;
		this.maxSalary = maxSalary;
		this.averageSalary = averageSalary;
		this.medianSalary = medianSalary;
	}


	public double getMinSalary() {
		return minSalary;
	}


	public void setMinSalary(double minSalary) {
		this.minSalary = minSalary;
	}


	public double getMaxSalary() {
		return maxSalary;
	}


	public void setMaxSalary(double maxSalary) {
		this.maxSalary = maxSalary;
	}


	public double getAverageSalary() {
		return averageSalary;
	}


	public void setAverageSalary(double averageSalary) {
		this.averageSalary = averageSalary;
	}


	public double getMedianSalary() {
		return medianSalary;
	}


	public void setMedianSalary(double medianSalary) {
		this.medianSalary = medianSalary;
	}
    
	
}
