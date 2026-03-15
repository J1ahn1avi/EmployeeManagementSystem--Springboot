package com.example.ems.service;

import java.util.List;

import com.example.ems.model.Employee;

public interface EmployeeService {
	Employee addEmployee(Employee employee);
	Employee getEmployee(Long id);
	List<Employee> getAllEmployees();
	Employee updateEmployee(Long id, Employee employee);
	void deleteEmployee(Long id);
	List<Employee> getEmployeesByDepartment(String department);
	List<Employee> searchEmployees(String name);
}
