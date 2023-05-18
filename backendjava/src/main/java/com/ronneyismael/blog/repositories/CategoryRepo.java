package com.ronneyismael.blog.repositories;

import com.ronneyismael.blog.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepo extends JpaRepository<Category, Integer> {

}
