package com.fashion.modules.comment.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fashion.exception.InvalidArgumentException;
import com.fashion.model.AccountVM;
import com.fashion.modules.blog.domain.Blog;
import com.fashion.modules.blog.repository.BlogRepository;
import com.fashion.modules.comment.domain.Comment;
import com.fashion.modules.comment.model.CommentReq;
import com.fashion.modules.comment.model.CommentVM;
import com.fashion.modules.comment.repository.CommentRepository;
import com.fashion.modules.comment.service.CommentService;
import com.fashion.modules.product.domain.Product;
import com.fashion.modules.product.repository.ProductRepository;
import com.fashion.service.IAccountService;
import com.fashion.service.impl.BaseService;

@Service
public class CommentServiceImpl extends BaseService implements CommentService {

	@Autowired
	private CommentRepository commentRepo;

	@Autowired
	private ProductRepository productRepo;

	@Autowired
	private BlogRepository blogRepo;

	@Autowired
	private IAccountService accountService;

	@Override
	@Transactional
	public CommentVM createComment(final CommentReq req) {
		final Comment comment = new Comment();
		comment.setContent(req.getContent());
		final AccountVM account = accountService.getAccountByUsername(getUserContext().getUsername());
		comment.setAccountId(account.getId());
		comment.setEmail(account.getUsername());
		final Integer productId = req.getProductId();
		final Integer blogId = req.getBlogId();
		final Integer storeId = getCurrentStoreId();
		if (productId != null) {
			final Product product = productRepo.findOneProductByIdAndStore(productId, storeId);
			if (product == null) {
				throw new InvalidArgumentException(" Can't found product ");
			}
			comment.setProduct(product);
		} else if (blogId != null) {
			final Blog blog = blogRepo.findOneById(blogId);
			if (blog == null) {
				throw new InvalidArgumentException(" Can't found blog ");
			}
			comment.setBlog(blog);
		} else {
			throw new InvalidArgumentException(" Can't create comment. Because can't found product or blog ");
		}

		return convertToVM(commentRepo.save(comment));
	}

	private CommentVM convertToVM(final Comment comment) {
		final CommentVM vm = mapper.map(comment, CommentVM.class);
		final String email = comment.getEmail();
		vm.setCustomerName(email);
		vm.setCustomerImage(accountService.getAccountByUsername(email).getImageUrl());
		return vm;
	}

	@Override
	@Transactional
	public CommentVM updateComment(final String content, final Integer id) {
		final Comment comment = commentRepo.findOneById(id);
		checkUserComment(comment);
		comment.setContent(content);
		return convertToVM(comment);
	}

	private void checkUserComment(final Comment comment) {
		if (comment == null) {
			throw new InvalidArgumentException(" Can't found comment.");
		}
		if (comment.getAccountId() != getUserContext().getAccountId()) {
			throw new InvalidArgumentException(" You can't owner this comment.");
		}
	}

	@Override
	@Transactional
	public void deleteComment(final Integer id) {
		final Comment comment = commentRepo.findOneById(id);
		checkUserComment(comment);
		commentRepo.deleteById(id);
	}

	@Override
	@Transactional
	public CommentVM likeComment(final Integer id, final boolean isLike, final int time) {
		final Comment comment = commentRepo.findOneById(id);
		if (comment == null) {
			throw new InvalidArgumentException(" Can't found comment.");
		}
		final boolean increment = time == 0;
		if (isLike) {
			Integer oldLike = comment.getLike();
			final boolean isLikeNull = oldLike == null;
			comment.setLike(increment ? (isLikeNull ? 1 : ++oldLike) : (isLikeNull ? 0 : --oldLike));
		} else {
			Integer oldDislike = comment.getDislike();
			final boolean isDislikeNull = oldDislike == null;
			comment.setDislike(increment ? (isDislikeNull ? 1 : ++oldDislike) : (isDislikeNull ? 0 : --oldDislike));
		}
		return convertToVM(comment);
	}

}
