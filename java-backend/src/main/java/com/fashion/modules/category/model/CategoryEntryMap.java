package com.fashion.modules.category.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CategoryEntryMap {
	private String categoryName;
	private Long quantity;
}
