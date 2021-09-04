package com.fashion.modules.size.model;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SizeVM implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -337279183992801530L;

	private String sizeName;
	
	private Integer id;
}
