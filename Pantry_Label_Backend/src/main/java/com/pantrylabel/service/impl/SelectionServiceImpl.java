package com.pantrylabel.service.impl;
import com.pantrylabel.dto.request.SelectionRequest;
import com.pantrylabel.entity.Product;
import com.pantrylabel.entity.Selection;
import com.pantrylabel.entity.User;
import com.pantrylabel.exception.ResourceNotFoundException;
import com.pantrylabel.repository.ProductRepository;
import com.pantrylabel.repository.SelectionRepository;
import com.pantrylabel.repository.UserRepository;
import com.pantrylabel.service.SelectionService;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service public class SelectionServiceImpl implements SelectionService {
    private final UserRepository users; private final ProductRepository products; private final SelectionRepository selections;
    public SelectionServiceImpl(UserRepository users, ProductRepository products, SelectionRepository selections) { this.users = users; this.products = products; this.selections = selections; }
    @Override @Transactional public void save(String email, SelectionRequest request) { User user = users.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found")); List<Product> selected = products.findAllById(request.getProductIds()); if (selected.size() != request.getProductIds().size()) throw new ResourceNotFoundException("One or more products were not found"); selections.save(Selection.builder().user(user).products(selected).font(request.getFont()).shape(request.getShape()).background(request.getBackground()).build()); }
}
