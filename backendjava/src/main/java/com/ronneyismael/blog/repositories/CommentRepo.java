package com.ronneyismael.blog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ronneyismael.blog.entities.Comment;

public interface CommentRepo  extends JpaRepository<Comment	, Integer> {

}
