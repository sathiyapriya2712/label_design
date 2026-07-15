package com.pantrylabel.repository;

import com.pantrylabel.entity.Product;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByStateId(Long stateId);
    
    List<Product> findByStateIdAndCategoryId(Long stateId, Long categoryId);
    
    @Query("SELECT p FROM Product p WHERE p.state.id = :stateId AND " +
           "(LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(p.bilingualName) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Product> searchByState(@Param("stateId") Long stateId, @Param("search") String search);

    @Query("SELECT p FROM Product p WHERE p.state.id = :stateId AND p.category.id = :categoryId AND " +
           "(LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(p.bilingualName) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Product> searchByStateAndCategory(@Param("stateId") Long stateId, @Param("categoryId") Long categoryId, @Param("search") String search);
}
