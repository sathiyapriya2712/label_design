package com.pantrylabel.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SelectionRequest {
    @NotEmpty(message = "Product IDs cannot be empty")
    private List<Long> productIds;

    @NotBlank(message = "Font is required")
    private String font;

    @NotBlank(message = "Shape is required")
    private String shape;

    @NotBlank(message = "Background is required")
    private String background;
}
