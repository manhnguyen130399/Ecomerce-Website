package com.fashion.modules.category.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryVM {

	private Integer id;

	private String categoryName;

	private String image;

}
