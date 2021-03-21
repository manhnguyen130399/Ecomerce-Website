package com.fashion.modules.report.model;

import java.util.List;

import com.fashion.model.BaseRes;

import lombok.Data;

@Data
public class OrderRes extends BaseRes {
	private List<OrderVM> data;
}
