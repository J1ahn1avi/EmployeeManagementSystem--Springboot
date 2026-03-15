package com.example.ems.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ems.model.Employee;
import com.example.ems.repository.EmployeeRepository;

@Service
public class EmployeeServiceImpl implements EmployeeService{
	
	@Autowired
	private EmployeeRepository employeeRepository;

	@Override
	public Employee addEmployee(Employee employee) {
		if(employeeRepository.existsByEmail(employee.getEmail())) {
			throw new RuntimeException("Email already exists");
		}
		return employeeRepository.save(employee);
	}

	@Override
	public Employee getEmployee(Long id) {
		return employeeRepository.findById(id).orElseThrow(()-> new RuntimeException("Employee not found with id: "+id));
	}

	@Override
	public List<Employee> getAllEmployees() {
		return employeeRepository.findAll();
	}

	@Override
	public Employee updateEmployee(Long id, Employee employeeDetails) {
		Employee emp=getEmployee(id);
		emp.setFirstName(employeeDetails.getFirstName());
		emp.setLastName(employeeDetails.getLastName());
		emp.setPhone(employeeDetails.getPhone());
		emp.setDepartment(employeeDetails.getDepartment());
		emp.setPosition(employeeDetails.getPosition());
		emp.setSalary(employeeDetails.getSalary());
		emp.setHireDate(employeeDetails.getHireDate());
		
		if(!emp.getEmail().equals(employeeDetails.getEmail())) {
			if(employeeRepository.existsByEmail(employeeDetails.getEmail())) {
				throw new RuntimeException("Email already exists!");
			}
			emp.setEmail(employeeDetails.getEmail());
		}
		return employeeRepository.save(emp);
	}

	@Override
	public void deleteEmployee(Long id) {
		Employee emp=getEmployee(id);
		employeeRepository.delete(emp);
		
	}

	@Override
	public List<Employee> searchEmployees(String name) {
		// TODO Auto-generated method stub
		return employeeRepository.findByFirstNameContainingOrLastNameContaining(name,name);
	}

	@Override
	public List<Employee> getEmployeesByDepartment(String department) {
		// TODO Auto-generated method stub
		return employeeRepository.findByDepartment(department);
	}

}
