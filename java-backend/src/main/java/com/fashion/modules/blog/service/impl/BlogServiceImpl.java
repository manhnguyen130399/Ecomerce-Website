package com.fashion.modules.blog.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.fashion.commons.constants.Constants;
import com.fashion.commons.constants.ErrorMessage;
import com.fashion.commons.enums.AccountType;
import com.fashion.commons.enums.BlogState;
import com.fashion.commons.enums.SortType;
import com.fashion.commons.utils.CommonUtil;
import com.fashion.exception.InvalidArgumentException;
import com.fashion.modules.blog.domain.Blog;
import com.fashion.modules.blog.model.BlogReq;
import com.fashion.modules.blog.model.BlogUpdateReq;
import com.fashion.modules.blog.model.BlogVM;
import com.fashion.modules.blog.repository.BlogRepository;
import com.fashion.modules.blog.service.BlogService;
import com.fashion.service.impl.BaseService;
import com.google.common.collect.Iterables;

@Service
public class BlogServiceImpl extends BaseService implements BlogService {

	@Autowired
	private BlogRepository blogRepo;

	@Autowired
	private JavaMailSender mailSender;

	@Override
	@Transactional
	public BlogVM createBlog(final BlogReq req) {
		final Blog blog = mapper.map(req, Blog.class);
		blog.setStore(getStore(getUserContext()));
		blog.setState(BlogState.PENDING);
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
		final Blog blog = blogRepo.findOneByIdAndStoreId(id, getCurrentStoreId());
		if (blog == null) {
			throw new InvalidArgumentException(ErrorMessage.NOT_FOUND);
		}
		final BlogVM res = mapper.map(blog, BlogVM.class);
		res.setAuthor(blog.getCreatedBy());
		return res;
	}

	@Override
	@Transactional
	public Page<BlogVM> getAllBlog(final Integer page, final Integer pageSize, final SortType sortOrder,
			final String sortField, final String title) {
		if (StringUtils.isEmpty(title)) {
			return blogRepo.findAll(PageRequest.of(page, pageSize, CommonUtil.sortCondition(sortOrder, sortField)))
					.map(it -> mapper.map(it, BlogVM.class));
		}
		return searchByTitle(page, pageSize, sortOrder, sortField, title);
	}

	@Transactional
	public Page<BlogVM> searchByTitle(final Integer page, final Integer pageSize, final SortType sortOrder,
			final String sortField, final String title) {
		return blogRepo
				.findAllByTitleLike(title,
						PageRequest.of(page, pageSize, CommonUtil.sortCondition(sortOrder, sortField)))
				.map(it -> mapper.map(it, BlogVM.class));
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
		final Blog blog = blogRepo.findOneByIdAndStoreId(id, getCurrentStoreId());
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

}
