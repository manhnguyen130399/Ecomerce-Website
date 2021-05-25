package com.fashion.modules.comment.web;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.fashion.commons.constants.Constants;
import com.fashion.modules.comment.model.CommentReq;
import com.fashion.modules.comment.model.RatingReq;
import com.fashion.modules.comment.service.CommentService;
import com.fashion.web.BaseResource;

import io.swagger.annotations.Api;

@Controller
@RequestMapping(path = { "/api" })
@Api(value = "API for Comment")
public class CommentResource extends BaseResource {

	private static final String URL = "/comment";

	@Autowired
	private CommentService commentService;

	@PostMapping(URL + "/create")
	public ResponseEntity<Map<String, Object>> comment(@RequestBody final CommentReq req) {
		return success(commentService.createComment(req));

	}

	@PutMapping(URL + "/{id}")
	public ResponseEntity<Map<String, Object>> updateComment(@RequestBody final String content,
			@PathVariable(required = true) final Integer id) {
		return success(commentService.updateComment(content, id));
	}

	@DeleteMapping(URL + "/{id}")
	public ResponseEntity<Map<String, Object>> deleteComment(@PathVariable(required = true) final Integer id) {
		commentService.deleteComment(id);
		return success(Constants.SUCCESS);
	}

	@GetMapping(URL + "/{id}")
	public ResponseEntity<Map<String, Object>> like(@PathVariable(required = true) final Integer id,
			@RequestParam(required = true) final boolean isLike) {
		return success(commentService.likeComment(id, isLike));
	}

	@PostMapping(URL + "/rating")
	public ResponseEntity<Map<String, Object>> rating(@RequestBody final RatingReq req) {
		return success(commentService.rating(req));
	}

	@GetMapping(URL + "/interactive")
	public ResponseEntity<Map<String, Object>> checkInteractiveComment(@RequestParam(required = true) final Integer id,
			@RequestParam(required = true) final boolean isLike) {
		return success(commentService.checkInteractive(id, isLike));
	}

}
