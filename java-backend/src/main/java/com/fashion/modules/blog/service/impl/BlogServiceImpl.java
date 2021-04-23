package com.fashion.modules.blog.service.impl;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.beust.jcommander.internal.Lists;
import com.fashion.commons.constants.Constants;
import com.fashion.commons.constants.ErrorMessage;
import com.fashion.commons.enums.AccountType;
import com.fashion.commons.enums.BlogState;
import com.fashion.commons.enums.BlogType;
import com.fashion.commons.enums.SortType;
import com.fashion.commons.utils.CommonUtil;
import com.fashion.exception.InvalidArgumentException;
import com.fashion.modules.blog.domain.Blog;
import com.fashion.modules.blog.model.BlogReq;
import com.fashion.modules.blog.model.BlogRes;
import com.fashion.modules.blog.model.BlogUpdateReq;
import com.fashion.modules.blog.model.BlogVM;
import com.fashion.modules.blog.repository.BlogRepository;
import com.fashion.modules.blog.service.BlogService;
import com.fashion.modules.comment.domain.Comment;
import com.fashion.modules.comment.model.CommentVM;
import com.fashion.service.IAccountService;
import com.fashion.service.impl.BaseService;
import com.google.common.collect.Iterables;

@Service
public class BlogServiceImpl extends BaseService implements BlogService {

	@Autowired
	private BlogRepository blogRepo;

	@Autowired
	private JavaMailSender mailSender;
	
	@Autowired
	private IAccountService accountService;

	@Override
	@Transactional
	public BlogVM createBlog(final BlogReq req) {
		final Blog blog = mapper.map(req, Blog.class);
		blog.setStore(getStore(getUserContext()));
		blog.setState(BlogState.PENDING);
		blog.setImage(req.getImage());
		blog.setCategory(req.getCategory());
		final Blog save = blogRepo.save(blog);
		final String message = "Blog " + blog.getId() + " author :" + blog.getCreatedBy() + " request to you";
		sendMail(Constants.EMAIL, Constants.BLOG_ADMIN_TITLE, message);
		final BlogVM res = mapper.map(save, BlogVM.class);
		res.setAuthor(save.getCreatedBy());
		return res;
	}

	private void sendMail(final String email, final String subject, final String message) {
		final SimpleMailMessage content = new SimpleMailMessage();
		content.setTo(email);
		content.setSubject(subject);
		content.setText(message);
		mailSender.send(content);
	}

	@Override
	@Transactional
	public BlogVM getBlogById(final Integer id) {
		final Blog blog = blogRepo.findOneById(id);
		if (blog == null) {
			throw new InvalidArgumentException(ErrorMessage.NOT_FOUND);
		}
		final BlogVM res = mapper.map(blog, BlogVM.class);
		res.setComments(blog.getComments().stream().filter(i -> i.getEmail() != null)
				.sorted(Comparator.comparing(Comment::getCreatedAt).reversed()).map(it -> convertToVM(it))
				.collect(Collectors.toList()));
		res.setAuthor(blog.getCreatedBy());
		return res;
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
	public Page<BlogVM> getAllBlog(final Integer page, final Integer pageSize, final SortType sortOrder,
			final String sortField, final String title) {
		if (StringUtils.isEmpty(title)) {
			return blogRepo.findAll(PageRequest.of(page, pageSize, CommonUtil.sortCondition(sortOrder, sortField)))
					.map(it -> {
						final BlogVM blog = mapper.map(it, BlogVM.class);
						blog.setAuthor(it.getCreatedBy());
						return blog;
					});
		}
		return searchByTitle(page, pageSize, sortOrder, sortField, title);
	}

	@Transactional
	public Page<BlogVM> searchByTitle(final Integer page, final Integer pageSize, final SortType sortOrder,
			final String sortField, final String title) {
		return blogRepo.findAllByTitleLike(title,
				PageRequest.of(page, pageSize, CommonUtil.sortCondition(sortOrder, sortField))).map(it -> {
					final BlogVM blog = mapper.map(it, BlogVM.class);
					blog.setAuthor(it.getCreatedBy());
					return blog;
				});
	}

	@Override
	@Transactional
	public BlogVM deleteBlog(final Integer id, final Integer page, final Integer pageSize, final SortType sortOrder,
			final String sortField, final String title) {
		try {
			blogRepo.deleteById(id);
		} catch (Exception e) {
			throw new InvalidArgumentException(ErrorMessage.NOT_FOUND);
		}

		final Page<BlogVM> allBlogs = getAllBlog(page, pageSize, sortOrder, sortField, title);
		final List<BlogVM> content = allBlogs.getContent();
		if (CollectionUtils.isEmpty(content)) {
			return null;
		}
		return Iterables.getLast(content);
	}

	@Override
	@Transactional
	public BlogVM updateBlog(final Integer id, final BlogUpdateReq req) {
		final Blog blog = blogRepo.findOneById(id);
		if (blog == null) {
			throw new InvalidArgumentException(ErrorMessage.NOT_FOUND);
		}
		if (AccountType.ADMIN.equals(getUserContext().getType())) {
			final BlogState state = req.getState();
			blog.setState(state);
			sendMail(blog.getCreatedBy(), Constants.BLOG_ADMIN_REPLY,
					BlogState.COMPLETE.equals(state) ? Constants.BLOG_COMPLETE : Constants.BLOG_CANCEL);
		} else {
			blog.setContent(req.getContent());
			blog.setSummary(req.getSummary());
			blog.setTitle(req.getTitle());
		}
		return mapper.map(blog, BlogVM.class);
	}

	@Override
	public List<BlogState> getBlogStates() {
		return Lists.newArrayList(BlogState.COMPLETE, BlogState.CANCLE, BlogState.PENDING);
	}

	@Override
	public BlogRes getBlogRecentAndCategories() {
		final List<BlogVM> blogs = getAllBlogComplete(0, Integer.MAX_VALUE, null).getContent();
		final BlogRes res = new BlogRes();
		final int size = blogs.size();
		res.setBlogRecents(blogs.subList(0, size > 3 ? 3 : size));
		final List<BlogType> blogTypes = Lists.newArrayList(BlogType.BEAUTY, BlogType.FASHION, BlogType.MAN,
				BlogType.WOMAN);
		final Map<BlogType, Long> blogTypeMaps = blogs.stream()
				.collect(Collectors.groupingBy(BlogVM::getCategory, Collectors.counting()));
		final List<BlogType> blogTypeExisteds = blogTypeMaps.entrySet().stream().map(it -> it.getKey())
				.collect(Collectors.toList());
		final List<String> categories = Lists.newArrayList(4);
		categories.addAll(blogTypeMaps.entrySet().stream().map(it -> toString(it.getKey(), it.getValue()))
				.collect(Collectors.toList()));
		categories.addAll(blogTypes.stream().filter(it -> !blogTypeExisteds.contains(it))
				.map(i -> toString(i, (long) 0)).collect(Collectors.toList()));
		res.setCategories(categories);
		return res;
	}

	private String toString(final BlogType key, final Long value) {
		final StringBuilder builder = new StringBuilder();
		builder.append(key);
		builder.append(Constants.BLANK);
		builder.append(Constants.ROUND_BRACKET_PREFIX);
		builder.append(value);
		builder.append(Constants.ROUND_BRACKET_SUFFIX);
		return builder.toString();
	}

	@Override
	@Transactional
	public Page<BlogVM> getAllBlogComplete(final Integer page, final Integer pageSize, final BlogType type) {
		return blogRepo.getBlogComple(page, pageSize, type).map(it -> mapper.map(it, BlogVM.class));
	}

	@Override
	public List<BlogType> getBlogTypes() {
		return Lists.newArrayList(BlogType.BEAUTY, BlogType.FASHION, BlogType.MAN, BlogType.WOMAN);
	}
}
