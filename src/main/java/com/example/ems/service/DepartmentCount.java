package com.example.ems.service;

public class DepartmentCount {
	private String department;
    private long count;
    
    public DepartmentCount() {}
    
    public DepartmentCount(String department, long count) {
        this.department = department;
        this.count = count;
    }

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public long getCount() {
		return count;
	}

	public void setCount(long count) {
		this.count = count;
	}
    
    
}
