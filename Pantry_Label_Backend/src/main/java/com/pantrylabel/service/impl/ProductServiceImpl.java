package com.pantrylabel.service.impl;
import com.pantrylabel.dto.response.*;
import com.pantrylabel.mapper.DtoMapper;
import com.pantrylabel.repository.*;
import com.pantrylabel.service.ProductService;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service public class ProductServiceImpl implements ProductService {
    private final StateRepository states; private final CategoryRepository categories; private final ProductRepository products; private final DtoMapper mapper;
    public ProductServiceImpl(StateRepository states, CategoryRepository categories, ProductRepository products, DtoMapper mapper) { this.states = states; this.categories = categories; this.products = products; this.mapper = mapper; }
    @Override @Transactional(readOnly = true) public List<StateDto> getStates() { return states.findAll().stream().map(mapper::state).toList(); }
    @Override @Transactional(readOnly = true) public List<CategoryDto> getCategories() { return categories.findAll().stream().map(mapper::category).toList(); }
    @Override @Transactional(readOnly = true) public List<ProductDto> getProducts(Long stateId, Long categoryId, String search) { if (stateId == null) return List.of(); boolean hasSearch = search != null && !search.isBlank(); return (hasSearch ? (categoryId == null ? products.searchByState(stateId, search.trim()) : products.searchByStateAndCategory(stateId, categoryId, search.trim())) : (categoryId == null ? products.findByStateId(stateId) : products.findByStateIdAndCategoryId(stateId, categoryId))).stream().map(mapper::product).toList(); }
}
