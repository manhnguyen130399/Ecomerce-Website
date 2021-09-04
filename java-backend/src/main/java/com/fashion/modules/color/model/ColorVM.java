package com.fashion.modules.color.model;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ColorVM implements Serializable{

	private static final long serialVersionUID = 1L;

	private Integer id;

	private String colorName;

	private String colorCode;

}
