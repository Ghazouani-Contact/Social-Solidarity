package com.example.demo.dto;

import java.sql.Date;
import lombok.Data;

@Data
public class PostDto {
    private Long id;
    private String name;
    private String content;
    private Date date;
    private Integer userId; // To link back to the user
    private String userName;
    private String userEmail;
    private String userNumber;
    private byte[] filePath;
    private Long categoryId;  // New field for categoryId
    private String categoryName; // Add this field

  // Getters and setters
  /* public Long getId() {
    return id;
}

public void setId(Long id) {
    this.id = id;
}

public String getName() {
    return name;
}

public void setName(String name) {
    this.name = name;
}

public String getContent() {
    return content;
}

public void setContent(String content) {
    this.content = content;
}

public Date getDate() {
    return date;
}

public void setDate(Date date) {
    this.date = date;
}

public byte[] getFilePath() {
    return filePath;
}

public void setFilePath(byte[] filePath) {
    this.filePath = filePath;
}

public Integer getUserId() {
    return userId;
}

public void setUserId(Integer userId) {
    this.userId = userId;
}

public String getCategoryName() {
    return categoryName;
}

public void setCategoryName(String categoryName) {
    this.categoryName = categoryName;
} */

}