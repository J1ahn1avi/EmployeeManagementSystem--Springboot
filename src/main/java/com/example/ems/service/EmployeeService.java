package com.example.ems.service;

import java.awt.print.Pageable;
import java.util.List;

import org.springframework.data.domain.Page;

import com.example.ems.model.Employee;

public interface EmployeeService {
	Employee addEmployee(Employee employee);
	Employee getEmployee(Long id);
	List<Employee> getAllEmployees();
	Employee updateEmployee(Long id, Employee employee);
	void deleteEmployee(Long id);
	List<Employee> getEmployeesByDepartment(String department);
	List<Employee> searchEmployees(String name);
	//pageination 
	Page<Employee> getEmployeesPaginated(Pageable pageable);
	
	//dashboard
	DashboardStats getDashboardStats();
    List<DepartmentCount> getDepartmentCounts();
    SalaryStats getSalaryStats();
}