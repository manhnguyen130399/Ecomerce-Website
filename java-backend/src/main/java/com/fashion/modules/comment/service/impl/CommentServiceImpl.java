package com.fashion.modules.comment.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fashion.exception.InvalidArgumentException;
import com.fashion.modules.account.domain.Account;
import com.fashion.modules.account.repository.AccountRepository;
import com.fashion.modules.blog.domain.Blog;
import com.fashion.modules.blog.repository.BlogRepository;
import com.fashion.modules.comment.domain.Comment;
import com.fashion.modules.comment.model.CommentReq;
import com.fashion.modules.comment.model.CommentVM;
import com.fashion.modules.comment.repository.CommentRepository;
import com.fashion.modules.comment.service.CommentService;
import com.fashion.modules.product.domain.Product;
import com.fashion.modules.product.repository.ProductRepository;
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
	private AccountRepository accountRepo;

	@Override
	@Transactional
	public CommentVM createComment(final CommentReq req) {
		final Comment comment = new Comment();
		comment.setContent(req.getContent());
		final Account account = accountRepo.findByUsername(getUserContext().getUsername());
		comment.setAccount(account);
		comment.setEmail(req.getEmail() != null ? req.getEmail() : account.getUsername());
		final Integer productId = req.getProductId();
		final Integer blogId = req.getBlogId();
		final Integer storeId = getStore(getUserContext()).getId();
		if (productId != null) {
			final Product product = productRepo.findOneProductByIdAndStore(productId, storeId);
			if (product == null) {
				throw new InvalidArgumentException(" Can't found product ");
			}
			comment.setProduct(product);
		} else if (blogId != null) {
			final Blog blog = blogRepo.findOneByIdAndStoreId(blogId, storeId);
			if (blog == null) {
				throw new InvalidArgumentException(" Can't found blog ");
			}
		} else {
			throw new InvalidArgumentException(" Can't not create comment. Because can't found product or blog ");
		}

		return mapper.map(commentRepo.save(comment), CommentVM.class);
	}

	@Override
	@Transactional
	public CommentVM updateComment(final String content, final Integer id) {
		final Comment comment = commentRepo.findOneById(id);
		if (comment == null) {
			throw new InvalidArgumentException(" Can't found comment.");
		}
		comment.setContent(content);
		return mapper.map(comment, CommentVM.class);
	}

	@Override
	@Transactional
	public void deleteComment(final Integer id) {
		commentRepo.deleteById(id);
	}

	@Override
	@Transactional
	public CommentVM likeComment(final Integer id) {
		final Comment comment = commentRepo.findOneById(id);
		if (comment == null) {
			throw new InvalidArgumentException(" Can't found comment.");
		}
		Integer oldLike = comment.getLike();
		comment.setLike(oldLike == null ? 1 : ++oldLike);
		return mapper.map(comment, CommentVM.class);
	}

}
