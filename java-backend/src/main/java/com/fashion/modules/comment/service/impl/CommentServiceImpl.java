package com.fashion.modules.comment.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fashion.commons.constants.ErrorMessage;
import com.fashion.domain.UserContext;
import com.fashion.exception.InvalidArgumentException;
import com.fashion.model.AccountVM;
import com.fashion.modules.blog.domain.Blog;
import com.fashion.modules.blog.repository.BlogRepository;
import com.fashion.modules.comment.domain.Comment;
import com.fashion.modules.comment.domain.UserComment;
import com.fashion.modules.comment.domain.UserLikeCommentId;
import com.fashion.modules.comment.model.CommentReq;
import com.fashion.modules.comment.model.CommentVM;
import com.fashion.modules.comment.model.RatingReq;
import com.fashion.modules.comment.repository.CommentRepository;
import com.fashion.modules.comment.repository.UserCommentRepository;
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

	@Autowired
	private UserCommentRepository userCommentRepo;

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
		if (productId != null) {
			final Product product = productRepo.getOne(productId);
			if (product == null) {
				throw new InvalidArgumentException(ErrorMessage.NOT_FOUND_PRODUCT);
			}
			comment.setProduct(product);
		} else if (blogId != null) {
			final Blog blog = blogRepo.findOneById(blogId);
			if (blog == null) {
				throw new InvalidArgumentException(ErrorMessage.NOT_FOUND_BLOG);
			}
			comment.setBlog(blog);
		} else {
			throw new InvalidArgumentException(ErrorMessage.NOT_FOUND_PRODUCT_AND_BLOG);
		}

		return convertToVM(commentRepo.save(comment));
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
			throw new InvalidArgumentException(ErrorMessage.NOT_FOUND_COMMENT);
		}
		if (comment.getAccountId() != getUserContext().getAccountId()) {
			throw new InvalidArgumentException(ErrorMessage.NOT_OWNER_COMMENT);
		}
	}

	@Override
	@Transactional
	public void deleteComment(final Integer id) {
		final Comment comment = commentRepo.findOneById(id);
		checkUserComment(comment);
		commentRepo.deleteById(id);
	}

	@SuppressWarnings("null")
	@Override
	@Transactional
	public CommentVM likeComment(final Integer id, final boolean isLike, final int time) {
		final Comment comment = commentRepo.findOneById(id);
		if (comment == null) {
			throw new InvalidArgumentException(ErrorMessage.NOT_FOUND_COMMENT);
		}
		final UserLikeCommentId userLikeCommentId = new UserLikeCommentId(getUserContext().getAccountId(), id);
		final boolean increment = time == 0;
		UserComment userComment = userCommentRepo.findByUserLikeCommentId(userLikeCommentId);
		if (userComment == null || userComment.getIsLike() != isLike) {
			userComment = new UserComment();
			userComment.setUserLikeCommentId(userLikeCommentId);
			userComment.setIsLike(isLike);
			userCommentRepo.save(userComment);
			comment.setUserComment(java.util.Collections.singleton(userComment));
			if (isLike) {
				Integer oldLike = comment.getLike();
				final boolean isLikeNull = oldLike == null;
				comment.setLike(increment ? (isLikeNull ? 1 : ++oldLike) : (isLikeNull ? 0 : --oldLike));
			} else {
				Integer oldDislike = comment.getDislike();
				final boolean isDislikeNull = oldDislike == null;
				comment.setDislike(increment ? (isDislikeNull ? 1 : ++oldDislike) : (isDislikeNull ? 0 : --oldDislike));
			}
		} else {
			throw new InvalidArgumentException(ErrorMessage.HAS_LIKE_COMMENT);
		}
		return convertToVM(comment);
	}

	@Override
	@Transactional
	public CommentVM rating(final RatingReq req) {
		final UserContext context = getUserContext();
		final Integer accountId = context.getAccountId();
		Comment comment = commentRepo.getCommentByAccountIdAndProductId(accountId, req.getProductId());
		if (comment != null) {
			comment.setRating(req.getRate());
		} else {
			comment = new Comment();
			comment.setAccountId(accountId);
			comment.setEmail(context.getUsername());
			comment.setProduct(productRepo.getOne(req.getProductId()));
			comment.setRating(req.getRate());
		}
		return mapper.map(commentRepo.save(comment), CommentVM.class);
	}

}
