package com.jdlink.domain;

import java.util.Date;

/**
 * Created by matt on 2018/7/22.
 * 登录日志
 */
public class LoginLog {
    /**
     * 编号
     */
    private int id;
    /**
     * 用户编号
     */
    private int userId;
    /**
     * 用户名
     */
    private String username;
    /**
     * 时间
     */
    private Date time;
    /**
     * ip
     */
    private String ip;
    /**
     * 姓名
     */
    private String name;
    /**
     * 分页
     */
    private Page page;
    /**
     * 粗查询关键字
     */
    private String keywords;
    /**
     * 开始日期
     */
    private Date startDate;
    /**
     * 结束日期
     */
    private Date endDate;

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    @Override
    public String toString() {
        return "LoginLog{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", time=" + time +
                ", ip='" + ip + '\'' +
                '}';
    }
}
