package com.example.ems.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.ems.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByDepartment(String department);
    Employee findByEmail(String email);
    boolean existsByEmail(String email);
    List<Employee> findByFirstNameContainingOrLastNameContaining(String firstName, String lastName);
    
    
    @Query("SELECT COUNT(e) FROM Employee e")
    long getTotalEmployeeCount();
    
    @Query("SELECT AVG(e.salary) FROM Employee e WHERE e.salary IS NOT NULL")
    Double getAverageSalary();
    
    @Query("SELECT MAX(e.salary) FROM Employee e")
    Double getMaxSalary();
    
    @Query("SELECT MIN(e.salary) FROM Employee e")
    Double getMinSalary();
    
    @Query("SELECT e.department, COUNT(e) FROM Employee e GROUP BY e.department")
    List<Object[]> getDepartmentCountsNative();
}
