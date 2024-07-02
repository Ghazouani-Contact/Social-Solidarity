package com.example.demo.service;

import com.example.demo.model.Category;
import java.util.List;
import java.util.Optional;

public interface CategoryService {
    Category getCategoryById(Long categoryId);
    List<Category> getAllCategories();
    Category createCategory(Category category);
    Category updateCategory(Long categoryId, Category categoryDetails);
    void deleteCategory(Long categoryId);
    Optional<Category> findById(Long id);
    Optional<Category> findByName(String name); // Add this method


}
