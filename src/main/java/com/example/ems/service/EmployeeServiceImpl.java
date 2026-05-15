package com.example.ems.service;

import java.awt.print.Pageable;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.example.ems.model.Employee;
import com.example.ems.repository.EmployeeRepository;

@Service
public class EmployeeServiceImpl implements EmployeeService{
	
	@Autowired
	private EmployeeRepository employeeRepository;

//	@Override
//	public Employee addEmployee(Employee employee) {
//		if(employeeRepository.existsByEmail(employee.getEmail())) {
//			throw new RuntimeException("Email already exists");
//		}
//		return employeeRepository.save(employee);
//	}

//	@Override
//	public Employee getEmployee(Long id) {
//		return employeeRepository.findById(id).orElseThrow(()-> new RuntimeException("Employee not found with id: "+id));
//	}
//
//	@Override
//	public List<Employee> getAllEmployees() {
//		return employeeRepository.findAll();
//	}
//
//	@Override
//	public Employee updateEmployee(Long id, Employee employeeDetails) {
//		Employee emp=getEmployee(id);
//		emp.setFirstName(employeeDetails.getFirstName());
//		emp.setLastName(employeeDetails.getLastName());
//		emp.setPhone(employeeDetails.getPhone());
//		emp.setDepartment(employeeDetails.getDepartment());
//		emp.setPosition(employeeDetails.getPosition());
//		emp.setSalary(employeeDetails.getSalary());
//		emp.setHireDate(employeeDetails.getHireDate());
//		
//		if(!emp.getEmail().equals(employeeDetails.getEmail())) {
//			if(employeeRepository.existsByEmail(employeeDetails.getEmail())) {
//				throw new RuntimeException("Email already exists!");
//			}
//			emp.setEmail(employeeDetails.getEmail());
//		}
//		return employeeRepository.save(emp);
//	}
//
//	@Override
//	public void deleteEmployee(Long id) {
//		Employee emp=getEmployee(id);
//		employeeRepository.delete(emp);
//		
//	}
//
//	@Override
//	public List<Employee> searchEmployees(String name) {
//		// TODO Auto-generated method stub
//		return employeeRepository.findByFirstNameContainingOrLastNameContaining(name,name);
//	}
//
//	@Override
//	public List<Employee> getEmployeesByDepartment(String department) {
//		// TODO Auto-generated method stub
//		return employeeRepository.findByDepartment(department);
//	}
//	
	 @Override
	    public Employee addEmployee(Employee employee) {
	        if(employeeRepository.existsByEmail(employee.getEmail())) {
	            throw new RuntimeException("Email already exists");
	        }
	        return employeeRepository.save(employee);
	    }

	    @Override
	    public Employee getEmployee(Long id) {
	        return employeeRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
	    }

	    @Override
	    public List<Employee> getAllEmployees() {
	        return employeeRepository.findAll();
	    }

	    @Override
	    public Employee updateEmployee(Long id, Employee employeeDetails) {
	        Employee emp = getEmployee(id);
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
	        Employee emp = getEmployee(id);
	        employeeRepository.delete(emp);
	    }

	    @Override
	    public List<Employee> searchEmployees(String name) {
	        return employeeRepository.findByFirstNameContainingOrLastNameContaining(name, name);
	    }

	    @Override
	    public List<Employee> getEmployeesByDepartment(String department) {
	        return employeeRepository.findByDepartment(department);
	    }

	    // NEW: Pagination implementation
	    @Override
	    public Page<Employee> getEmployeesPaginated(Pageable pageable) {
	        return employeeRepository.findAll(pageable);
	    }

	    // NEW: Dashboard statistics implementation
	    @Override
	    public DashboardStats getDashboardStats() {
	        List<Employee> allEmployees = employeeRepository.findAll();
	        
	        long totalEmployees = allEmployees.size();
	        long totalDepartments = allEmployees.stream()
	                .map(Employee::getDepartment)
	                .filter(dept -> dept != null && !dept.isEmpty())
	                .distinct()
	                .count();
	        
	        double averageSalary = allEmployees.stream()
	                .filter(emp -> emp.getSalary() != null)
	                .mapToDouble(Employee::getSalary)
	                .average()
	                .orElse(0);
	        
	        double maxSalary = allEmployees.stream()
	                .filter(emp -> emp.getSalary() != null)
	                .mapToDouble(Employee::getSalary)
	                .max()
	                .orElse(0);
	        
	        double minSalary = allEmployees.stream()
	                .filter(emp -> emp.getSalary() != null)
	                .mapToDouble(Employee::getSalary)
	                .min()
	                .orElse(0);
	        
	        // New hires in current month
	        java.time.LocalDate now = java.time.LocalDate.now();
	        long newHiresThisMonth = allEmployees.stream()
	                .filter(emp -> emp.getHireDate() != null)
	                .filter(emp -> emp.getHireDate().getYear() == now.getYear() &&
	                               emp.getHireDate().getMonth() == now.getMonth())
	                .count();
	        
	        // Find top department
	        String topDepartment = allEmployees.stream()
	                .filter(emp -> emp.getDepartment() != null)
	                .collect(Collectors.groupingBy(Employee::getDepartment, Collectors.counting()))
	                .entrySet().stream()
	                .max(java.util.Map.Entry.comparingByValue())
	                .map(java.util.Map.Entry::getKey)
	                .orElse("N/A");
	        
	        return new DashboardStats(totalEmployees, totalDepartments, averageSalary, 
	                                  maxSalary, minSalary, newHiresThisMonth, topDepartment);
	    }

	    // NEW: Department distribution for charts
	    @Override
	    public List<DepartmentCount> getDepartmentCounts() {
	        List<Employee> allEmployees = employeeRepository.findAll();
	        
	        return allEmployees.stream()
	                .filter(emp -> emp.getDepartment() != null && !emp.getDepartment().isEmpty())
	                .collect(Collectors.groupingBy(Employee::getDepartment, Collectors.counting()))
	                .entrySet().stream()
	                .map(entry -> new DepartmentCount(entry.getKey(), entry.getValue()))
	                .collect(Collectors.toList());
	    }

	    // NEW: Salary statistics for charts
	    @Override
	    public SalaryStats getSalaryStats() {
	        List<Employee> allEmployees = employeeRepository.findAll();
	        List<Double> salaries = allEmployees.stream()
	                .filter(emp -> emp.getSalary() != null)
	                .map(Employee::getSalary)
	                .sorted()
	                .collect(Collectors.toList());
	        
	        double minSalary = salaries.stream().mapToDouble(Double::doubleValue).min().orElse(0);
	        double maxSalary = salaries.stream().mapToDouble(Double::doubleValue).max().orElse(0);
	        double averageSalary = salaries.stream().mapToDouble(Double::doubleValue).average().orElse(0);
	        
	        // Calculate median
	        double medianSalary = 0;
	        if (!salaries.isEmpty()) {
	            int size = salaries.size();
	            if (size % 2 == 0) {
	                medianSalary = (salaries.get(size/2 - 1) + salaries.get(size/2)) / 2;
	            } else {
	                medianSalary = salaries.get(size/2);
	            }
	        }
	        
	        return new SalaryStats(minSalary, maxSalary, averageSalary, medianSalary);
	    }
}
