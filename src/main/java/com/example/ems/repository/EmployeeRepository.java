package com.example.ems.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ems.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByDepartment(String department);
    Employee findByEmail(String email);
    boolean existsByEmail(String email);
    List<Employee> findByFirstNameContainingOrLastNameContaining(String firstName, String lastName);
}
