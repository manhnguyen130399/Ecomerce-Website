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

	@Override
	@Transactional
	public CommentVM likeComment(final Integer id, final boolean isLike) {
		final Comment comment = commentRepo.findOneById(id);
		if (comment == null) {
			throw new InvalidArgumentException(ErrorMessage.NOT_FOUND_COMMENT);
		}
		final UserLikeCommentId userLikeCommentId = new UserLikeCommentId(getUserContext().getAccountId(), id);
		UserComment userComment = userCommentRepo.findByUserLikeCommentId(userLikeCommentId);
		final Integer currentLike = comment.getLike();
		final Integer currentDislike = comment.getDislike();
		if (userComment == null) {
			userComment = updateCommentAndCreateUserComment(isLike, comment, userLikeCommentId, currentLike,
					currentDislike);
		} else {
			final boolean hasLiked = userComment.isLiked();
			final boolean hasDisliked = userComment.isDisliked();
			final boolean hasLikedAndNotDisliked = hasLiked && !hasDisliked;
			final boolean hasDislikedAndNotLiked = !hasLiked && hasDisliked;
			if (isLike) {
				likeComment(comment, userComment, currentLike, currentDislike, hasLikedAndNotDisliked,
						hasDislikedAndNotLiked);
			} else {
				dislikeComment(comment, userComment, currentLike, currentDislike, hasLikedAndNotDisliked,
						hasDislikedAndNotLiked);
			}
		}
		userCommentRepo.save(userComment);
		comment.setUserComment(java.util.Collections.singleton(userComment));
		return convertToVM(comment);
	}

	private UserComment updateCommentAndCreateUserComment(final boolean isLike, final Comment comment,
			final UserLikeCommentId userLikeCommentId, final Integer currentLike, final Integer currentDislike) {
		final UserComment userComment = new UserComment();
		userComment.setUserLikeCommentId(userLikeCommentId);
		if (isLike) {
			comment.setLike(currentLike + 1);
			userComment.setLiked(isLike);
		} else {
			comment.setDislike(currentDislike + 1);
			userComment.setDisliked(isLike);
		}
		return userComment;
	}

	private void dislikeComment(final Comment comment, UserComment userComment, final Integer currentLike,
			final Integer currentDislike, final boolean hasLikedAndNotDisliked, final boolean hasDislikedAndNotLiked) {
		if (hasDislikedAndNotLiked) {
			userComment.setDisliked(false);
			comment.setDislike(currentDislike - 1);
		} else if (hasLikedAndNotDisliked) {
			userComment.setDisliked(true);
			userComment.setLiked(false);
			comment.setDislike(currentDislike + 1);
			comment.setLike(currentLike - 1);
		} else {
			userComment.setDisliked(true);
			comment.setDislike(currentDislike + 1);
		}
	}

	private void likeComment(final Comment comment, UserComment userComment, final Integer currentLike,
			final Integer currentDislike, final boolean hasLikedAndNotDisliked, final boolean hasDislikedAndNotLiked) {
		if (hasLikedAndNotDisliked) {
			userComment.setLiked(false);
			comment.setLike(currentLike - 1);
		} else if (hasDislikedAndNotLiked) {
			userComment.setLiked(true);
			userComment.setDisliked(false);
			comment.setLike(currentLike + 1);
			comment.setDislike(currentDislike - 1);
		} else {
			userComment.setLiked(true);
			comment.setLike(currentLike + 1);
		}
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

	@Override
	public boolean checkInteractive(Integer id, boolean isLike) {
		final UserComment userComment = userCommentRepo
				.findByUserLikeCommentId(new UserLikeCommentId(getUserContext().getAccountId(), id));
		if (userComment == null) {
			return false;
		}
		return isLike && userComment.isLiked() ? true : !isLike && userComment.isDisliked() ? true : false;
	}

}
