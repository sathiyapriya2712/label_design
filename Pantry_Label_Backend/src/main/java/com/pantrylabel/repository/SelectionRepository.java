package com.pantrylabel.repository;

import com.pantrylabel.entity.Selection;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SelectionRepository extends JpaRepository<Selection, Long> {
    Optional<Selection> findFirstByUserIdOrderByCreatedDateDesc(Long userId);
}
