package com.petshop.main.tutor.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petshop.main.tutor.model.Tutor;

public interface TutorDAO extends JpaRepository<Tutor, Long> {

}
