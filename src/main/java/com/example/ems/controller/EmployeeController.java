package com.example.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ems.model.Employee;
import com.example.ems.service.EmployeeService;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500") 
@RequestMapping("/api/employees")
public class EmployeeController {
	@Autowired
	private EmployeeService employeeService;
	
	@PostMapping("/add")
	public Employee addEmployee(@RequestBody Employee employee) {
		return employeeService.addEmployee(employee);
	}
	
	@GetMapping("/all")
	public List<Employee> getAllEmployees() {
		return employeeService.getAllEmployees();
	}
	
	@GetMapping("/get/{id}")
	public Employee getEmployeeById(@PathVariable Long id) {
		return employeeService.getEmployee(id);
	}
	
	@PutMapping("/update/{id}")
	public Employee updateEmployee(@PathVariable Long id, @RequestBody Employee employee) {
		return employeeService.updateEmployee(id, employee);
	}
	
	@DeleteMapping("/delete/{id}")
	public String deleteEmployee(@PathVariable Long id) {
		employeeService.deleteEmployee(id);
		return "Employee deleted successfully with id: " + id;
	}
	
	@GetMapping("/department/{department}")
	public List<Employee> getByDepartment(@PathVariable String department) {
		return employeeService.getEmployeesByDepartment(department);
	}
	
	@GetMapping("/search")
	public List<Employee> searchEmployees(@RequestParam String name) {
		return employeeService.searchEmployees(name);
	}
}
